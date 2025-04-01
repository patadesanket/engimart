// controllers/ProductController.js

const Product = require("../models/ProductModel"); // Assuming you have a Product model

exports.getProducts = async (req, res) => {
    try {
        const products = await Product.find(); // Fetch products from the database
        res.json(products);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server Error" });
    }
};
