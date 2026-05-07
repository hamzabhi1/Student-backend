import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import connectDB from "./config/db.js";
import mongoose from "mongoose";

const app = express();

connectDB();

app.use(
  cors({
    origin: "https://student-frontend-d3l9p7yj2-hamzabhi1s-projects.vercel.app",
    credentials: true,
  }),
);

// Parse middleware MUST come before routes
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

app.use("/uploads", express.static("uploads"));
app.use("/api/auth", authRoutes);

const isConnected = false;

async function connectToMongoDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}
app.use((req, res, next) => {
  if (!isConnected) {
    connectToMongoDB();
  }
  next();
});


app.get("/", (req, res) => {
  res.send("Hello World!");
});
// Export a serverless-compatible handler for Vercel
export default function handler(req, res) {
  return app(req, res);
}
module.exports = app;