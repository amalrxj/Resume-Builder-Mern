const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "resume-builder",
    allowed_formats: ["jpg", "png", "jpeg"],
    transformation: [{ width: 200, height: 200, crop: "fill" }],
  },
});

const upload = multer({ storage });

module.exports = upload;