const Product = require("../models/ProductModel"); 


const getProducts = async (req, res) => {
  try {
    const products = await Product.find(); 
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params; 
    
    const deletedProduct = await Product.findByIdAndDelete(id); 

    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
}; 

module.exports = { getProducts, deleteProduct };
