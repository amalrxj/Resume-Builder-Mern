const express = require("express");
const { registerUser, loginUser, getUserProfile } = require("../controllers/authController");
const { protect } = require("../middlewares/authMiddleware");
const upload = require("../middlewares/uploadMiddleware");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", protect, getUserProfile);

router.post("/upload-image", upload.single("image"), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
    }
    const rawUrl = req.file.path; // this is the original Cloudinary URL
    const optimizedUrl = rawUrl.replace(
        "/upload/",
        "/upload/w_200,h_200,c_fill,f_auto,q_auto/"
    );
    return res.status(200).json({ imageUrl: optimizedUrl });
});

module.exports = router;