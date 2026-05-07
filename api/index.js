import express from "express";
import cors from "cors";
import authRoutes from "../routes/authRoutes.js";
import connectDB from "../config/db.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// DB connect
connectDB();

app.use(express.json());

/* ✅ CORS FIX (IMPORTANT FOR VERCEL) */
const allowedOrigins = [
  "https://student-frontend-i1go3nd7r-hamzabhi1s-projects.vercel.app"
];

// Allow CORS from all origins to avoid preflight failures on Vercel.
// If you want to restrict origins later, replace with a whitelist.
app.use(
  cors({
    origin: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);

// Ensure preflight requests are handled
app.options("*", cors());

app.get("/", (req, res) => {
  res.send("Backend Working Successfully");
});

app.use("/api/auth", authRoutes);

export default app;