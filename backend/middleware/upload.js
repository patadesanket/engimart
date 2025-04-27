const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "engimart_products", 
        format: async (req, file) => "png", 
        public_id: (req, file) => Date.now() + "-" + file.originalname,
    },
});

const upload = multer({ storage });

module.exports = upload;
