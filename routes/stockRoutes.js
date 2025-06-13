const express = require("express");
const router = express.Router();
const { getStock, updateStock, deleteStock } = require("../controllers/stockController");

//  Get all stock products
router.get("/getStock", getStock);

//  Update stock by ID
router.put("/:id", updateStock);

// Delete stock by ID
router.delete("/:id", deleteStock);

module.exports = router;
