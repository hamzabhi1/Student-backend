import {
  getProfile,
  login,
  logout,
  addstudent,
  updateStudent,
  getAllStudents,
  deleteStudent
} from "../controllers/authController.js";
import express from "express";
import protect from "../middleware/authMiddleware.js";
import upload from "../config/upload.js";

const router = express.Router();

// Conditional upload middleware
const handleUpload = (req, res, next) => {
  const contentType = req.get('content-type') || '';
  console.log(`[${req.method} ${req.path}] Content-Type: ${contentType}`);
  
  if (contentType && contentType.includes('multipart/form-data')) {
    console.log('  → Using multer for file upload');
    upload.single('profilePicture')(req, res, (err) => {
      if (err) {
        console.error('  → Multer error:', err.message);
      }
      next();
    });
  } else {
    console.log('  → Skipping multer (no multipart)');
    next();
  }
};

router.post("/login", login);
router.post("/register", handleUpload, addstudent);
router.get("/students", protect, getAllStudents);
router.put("/student/:id", handleUpload, protect, updateStudent);
router.delete("/student/:id", protect, deleteStudent);
router.get("/profile", protect, getProfile);
router.post("/logout", logout);

export default router;
