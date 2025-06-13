const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');  // ✅ Import the path module
const uploadSchema = require("../models/Product")

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/Images");  // ✅ Use '../public/uploads' instead of '/uploads'
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// router.post('/', upload.single('file'), async (req,res)=> {
//   uploadSchema.create({image : req.file.filename})
//   .then(result => res.json(result))
//   .catch(err => console.log(err))
// });


router.post('/', upload.single('file'), async (req, res) => {
  try {
    const {
      productName,
      productDescription,
      nutritionalInfo,
      price,
      quantity,
      unit,
      category,
      subCategory,
      availableStock
    } = req.body;

    const newProduct = new uploadSchema({
      productName,
      productDescription,
      nutritionalInfo,
      price,
      quantity,
      unit,
      category,
      subCategory,
      availableStock,
      image: req.file ? req.file.filename : null  // Save image filename if uploaded
    });

    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to save product" });
  }
});


router.get("/get-image", (req, res) => {
  uploadSchema.find()
    .then(result => res.json(result))
    .catch(err => console.log(err))
})

module.exports = router;