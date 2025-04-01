const express = require("express");
const multer = require("multer");
const UploadProductController = require("../controllers/UploadProductController");
const ProductController = require("../controllers/ProductController"); // Create this controller

const router = express.Router();

// Multer setup for handling image uploads
const storage = multer.diskStorage({});
const upload = multer({ storage });

// Product Upload Route (Using Multer for Image Uploads)
router.post("/products", upload.single("image"), UploadProductController);

// Product Fetch Route (GET)
router.get("/products", ProductController.getProducts); // Add a controller method to fetch products

module.exports = router;
