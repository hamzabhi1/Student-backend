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

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (like Postman)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true
  })
);

/* ✅ THIS IS CRITICAL (preflight fix) */
app.options("*", cors());

app.get("/", (req, res) => {
  res.send("Backend Working Successfully");
});

app.use("/api/auth", authRoutes);

export default app;