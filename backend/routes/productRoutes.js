const express = require("express");
const multer = require("multer");
const UploadProductController = require("../controllers/UploadProductController");
const ProductController = require("../controllers/ProductController"); 

const router = express.Router();


const storage = multer.diskStorage({});
const upload = multer({ storage });


router.post("/products", upload.single("image"), UploadProductController);

router.delete("/products/:id", ProductController.deleteProduct);


router.get("/products", ProductController.getProducts); 

module.exports = router;
