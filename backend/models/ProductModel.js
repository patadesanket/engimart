const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    title: String,
    description: String,
    price: String,
    whatsapp: String,
    email: String,
    category: String,
    image: String, // Stores Cloudinary image URL
});

module.exports = mongoose.model("Product", productSchema);
