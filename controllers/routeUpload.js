const express = require('express');
const router = express.Router();
const cloudinary = require('../routes/uploadRoutes');
const upload = require('../middleware/multer');

// Route for uploading product images
router.post('/upload', upload.single('image'), (req, res) => {
  cloudinary.uploader.upload(req.file.path, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        success: false,
        message: "Error uploading image",
      });
    }

    res.status(200).json({
      success: true,
      message: "Uploaded!",
      data: result,
    });
  });
});

module.exports = router;
