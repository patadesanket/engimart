const Product = require("../models/ProductModel"); // Import the Product model

// Fetch all products
const getProducts = async (req, res) => {
  try {
    const products = await Product.find(); // Fetch all products from MongoDB
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

module.exports = { getProducts };
