const productModel = require("../models/ProductModel");
const cloudinary = require("../config/cloudinary");

async function UploadProductController(req, res) {
    try {
        const { title, description, price, whatsapp,userId, email, category, image } = req.body;
         
        
        if (!userId) {
            console.error("❌ Missing User ID");
            return res.status(400).json({ success: false, message: "User ID is required." });
        }

      
        let imageUrl = null;
        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path);
            imageUrl = result.secure_url;
        }

        // Create new product
        const newProduct = new productModel({
            title,
            description,
            price,
            whatsapp,
            email,
            category,
            userId,
            image: image,// Cloudinary image URL
        });

        const savedProduct = await newProduct.save();

        res.status(201).json({
            message: "Product uploaded successfully",
            error: false,
            success: true,
            data: savedProduct,
        });
        console.log("Request Body:", req.body);

    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false,
        });
    }
}

module.exports = UploadProductController;