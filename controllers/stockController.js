const Product  = require("../models/Product")

const getStock = async (req, res) => {
    try {
        const stock = await Product.find(); 
        if(!stock.length) {
            return res.status(404).json({message : "No Product found"})
        }
        res.status(200).json(stock);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateStock = async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedProduct);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deleteStock = async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.json({ message: "Product deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getStock, updateStock, deleteStock };
