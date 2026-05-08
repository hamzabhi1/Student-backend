import express from "express";
import cors from "cors";
import authRoutes from "../routes/authRoutes.js";
import connectDB from "../config/db.js";
import dotenv from "dotenv";
import serverless from "serverless-http";

dotenv.config();

const app = express();

connectDB();

app.use(express.json());

const allowedOrigins = [
  process.env.FRONTEND_URL || "https://student-frontend-three-phi.vercel.app",
];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// IMPORTANT
app.options("*", cors());

app.get("/", (req, res) => {
  res.send("Backend Working Successfully");
});

app.use("/api/auth", authRoutes);

export default serverless(app);