const express = require("express");
const multer = require("multer");
const Product = require("../models/Product");

const router = express.Router();
const upload = multer({ dest: "uploads/" });

// Add Product
router.post("/add", upload.single("image"), async (req, res) => {
  const { userId, name, description, price, location } = req.body;
  const image = req.file ? req.file.path : "";

  try {
    const product = new Product({ userId, name, description, price, location, image });
    await product.save();
    res.json({ message: "Product Added!" });
  } catch (error) {
    res.status(500).json({ message: "Error Adding Product" });
  }
});

// Get All Products
router.get("/", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

module.exports = router;
