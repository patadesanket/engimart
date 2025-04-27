const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    title: String,
    description: String,
    price: String,
    whatsapp: String,
    email: String,
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    category: String,
    image: [String], 
},
{ timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
