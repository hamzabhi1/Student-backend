import express from "express";
import cors from "cors";
import serverless from "serverless-http";
import authRoutes from "./routes/authRoutes.js";
import connectDB from "./config/db.js";


const app = express();

connectDB();

app.use(cors({
  origin: [
    "https://student-frontend-aoqy6lhbd-hamzabhi1s-projects.vercel.app",
    "https://student-frontend-d3l9p7yj2-hamzabhi1s-projects.vercel.app",
    "http://localhost:5173"
  ],
  credentials: true
}));

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

app.use("/uploads", express.static("uploads"));
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// ⭐ IMPORTANT FIX
export default serverless(app);