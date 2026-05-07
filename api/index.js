import express from "express";
import cors from "cors";
import authRoutes from "../routes/authRoutes.js";
import connectDB from "../config/db.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();

// Connect DB
connectDB();

app.use(
  cors({
    origin: "https://student-frontend-gl0lhd7nt-hamzabhi1s-projects.vercel.app",
    credentials: true,
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend Working Successfully");
});

app.use("/api/auth", authRoutes);

export default app;