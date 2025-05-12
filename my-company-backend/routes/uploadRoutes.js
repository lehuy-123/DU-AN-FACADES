const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();

// Cấu hình multer để lưu file vào thư mục public/uploads
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'public/uploads/');
  },
  filename(req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// Gọi controller
const { uploadImage } = require('../controllers/uploadController');

// Route upload 1 file
router.post('/', upload.single('image'), uploadImage);

module.exports = router;
