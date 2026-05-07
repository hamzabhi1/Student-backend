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

// Fallback: explicitly set CORS headers on all responses to guarantee
// `Access-Control-Allow-*` headers are present (helps in some serverless setups).
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  // For preflight requests, end early
  if (req.method === "OPTIONS") return res.sendStatus(204);
  next();
});

app.get("/", (req, res) => {
  res.send("Backend Working Successfully");
});

app.use("/api/auth", authRoutes);

export default app;