import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import connectDB from "./config/db.js";

const app = express();

connectDB();

app.use(
  cors({
    origin: "student-backend-q7rt4lsvv-hamzabhi1s-projects.vercel.app3",
    credentials: true,
  }),
);

// Parse middleware MUST come before routes
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

app.use("/uploads", express.static("uploads"));
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});


