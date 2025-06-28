const express = require("express");
const {
    createResume,
    getUserResumes,
    getResumeById,
    updateResume,
    deleteResume,
} = require("../controllers/resumeController");
const { protect } = require("../middlewares/authMiddleware");
const { uploadResumeImages } = require("../controllers/uploadImages");

const router = express.Router();

router.post("/", protect, createResume); // Create resume
router.get("/", protect, getUserResumes); // Get all resumes for the logged-in user
router.get("/:id", protect, getResumeById); // Get resume by ID
router.put("/:id", protect, updateResume); // Update resume by ID
router.delete("/:id", protect, deleteResume); // Delete resume by ID
router.post("/:id/upload-images", protect, uploadResumeImages); // Upload images for resume

module.exports = router;