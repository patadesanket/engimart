import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserCircle, FaTrash, FaArrowRight, FaBoxOpen } from "react-icons/fa";
import { AiOutlineCalculator } from "react-icons/ai";
import { GiLabCoat, GiPencilRuler, GiToolbox, GiElectric } from "react-icons/gi";
import { UploadCloud } from "lucide-react";
import "./sell.css";
import Footer from "../components/Footer";
import axios from "axios";
import { toast } from "react-toastify";
import { FaArrowLeft } from "react-icons/fa";




const Sell = () => {
    const navigate = useNavigate();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [products, setProducts] = useState([]);

    // Form Data State
    const [data, setData] = useState({
        productName: "",
        description: "",
        price: "",
        whatsapp: "",
        email: "",
        category: "",
        productImage: []
    });

    const categories = [
        { name: "Calculator", icon: <AiOutlineCalculator /> },
        { name: "Apron", icon: <GiLabCoat /> },
        { name: "Drawing Tools", icon: <GiPencilRuler /> },
        { name: "Workshop Tools", icon: <GiToolbox /> },
        { name: "Electric Components", icon: <GiElectric /> },
        { name: "Other", icon: <FaBoxOpen /> },
    ];

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login");
        } else {
            fetchProducts();
        }
    }, []); 


    const fetchProducts = async () => {
        try {
            const userId = localStorage.getItem("userId"); 
            const response = await axios.get("http://localhost:5050/api/products");

            if (response.data) {
                const userProducts = response.data.filter(
                    (product) => product.userId === userId 

                );

                setProducts(userProducts);
            }

        } catch (error) {
            toast.error("Error fetching products!");
        }
    };

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setData((prev) => ({ ...prev, [name]: value }));
    };

    
    const handleImageUpload = async (event) => {
        const files = Array.from(event.target.files);
        if (!files.length) return;

        const uploadedImages = [];

        for (let file of files) {
            const formData = new FormData();
            formData.append("file", file);
            formData.append("upload_preset", "engiMart");

            try {
                const response = await axios.post("https://api.cloudinary.com/v1_1/dmw8vqkrj/image/upload", formData);
                uploadedImages.push(response.data.secure_url);
            } catch (error) {
                toast.error("Failed to upload image!");
            }
        }

        
        setData((prev) => ({
            ...prev,
            productImage: [...prev.productImage, ...uploadedImages],
        }));
    };

    
    const handleDeleteProductImage = (index) => {
        setData((prev) => ({
            ...prev,
            productImage: prev.productImage.filter((_, i) => i !== index),
        }));
    };


    const handleDelete = async (productId) => {
        try {
            const response = await axios.delete(`http://localhost:5050/api/products/${productId}`);
            
            if (response.status === 200) {
                
                setProducts((prevProducts) => prevProducts.filter(product => product._id !== productId));
            } else {
                console.error("Failed to delete product:", response.data.message);
            }
        } catch (error) {
            console.error("Error deleting product:", error);
        }
    };



   
    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!data.category) {
            toast.error("Please select a category.");
            return;
        }

        console.log("User ID from localStorage:", localStorage.getItem("userId"));

        const userId = localStorage.getItem("userId");

        console.log("User ID before sending:", userId);

        if (!userId) {
            toast.error("User ID not found! Please log in again.");
            navigate("/login"); 
            return;
        }

        const productData = {
            title: data.productName, 
            description: data.description,
            price: data.price,
            whatsapp: data.whatsapp,
            email: data.email,
            category: data.category,
            image: data.productImage.length > 0 ? data.productImage[0] : "", 
            userId: userId,
        };

        console.log("Submitting Product Data:", data);

        try {


            const response = await axios.post("http://localhost:5050/api/products", productData, {
                headers: { "Content-Type": "application/json" },
            });

            console.log("API Response:", response.data);

            if (response.data.success) {

                toast.success(response.data.message);

                
                setProducts((prevProducts) => [...prevProducts, response.data.data]);

               
                setData({
                    productName: "",
                    description: "",
                    price: "",
                    whatsapp: "",
                    email: "",
                    category: "",
                    productImage: [],
                });

                console.log("Submitting Data:", productData);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error("Error submitting form!");
        }
    };



    return (
        <div>
            {/*  Navigation Bar */}
            <nav className="seller-navbar">
                <div className="back-arrow" onClick={() => navigate(-1)}>
                    <FaArrowLeft size={22} />
                </div>
                <div className="navbar-title">Engimart Seller's</div>
                <div className="profile-section">
                    <button className="profile-btn" onClick={() => setDropdownOpen(!dropdownOpen)}>
                        <FaUserCircle size={24} /> Profile
                    </button>
                    {dropdownOpen && (
                        <div className="dropdown-menu">
                            <button onClick={() => { localStorage.removeItem("token"); navigate("/login"); }}>Logout</button>
                        </div>
                    )}
                </div>
            </nav>


            {/* Display Uploaded Products in Real-Time */}
            <div className="list-product-container">
                <h2 className="section-title">Your listed Product</h2>
                <div className="product-list">
                    {products.length > 0 ? (
                        products.map((product) => (
                            <div key={product._id} className="product-card">
                            <button 
                                    className="delete-button" 
                                    onClick={() => handleDelete(product._id)}
                                    style={{
                                        position: "absolute",
                                        top: "5px",
                                        right: "5px",
                                        background: "red",
                                        color: "white",
                                        border: "none",
                                        borderRadius: "50%",
                                        width: "25px",
                                        height: "25px",
                                        cursor: "pointer",
                                        fontWeight: "bold",
                                    }}
                                >
                                    ✖
                                </button>
                                <img src={product.image} alt={product.title} className="product-image" />
                                <h3>{product.title}</h3>
                                <p><strong>Price:</strong> ₹{product.price}</p>
                            </div>
                        ))
                    ) : (
                        <p>No products uploaded yet.</p>
                    )}
                </div>
            </div>


            {/* Section to List New Product */}
            <div className="list-product-container">
                <h2 className="section-title">List New Product</h2>
                <div className="list-product-content">
                    {/* Categories Selection */}
                    <div className="category-section">
                        {categories.map((category) => (
                            <div
                                key={category.name}
                                className={`category-item ${data.category === category.name ? "active" : ""}`}
                                onClick={() => setData({ ...data, category: category.name })}
                            >
                                <span className="category-icon">{category.icon}</span>
                                <span className="category-name">{category.name}</span>
                                <span className="category-arrow"><FaArrowRight /></span>
                            </div>
                        ))}
                    </div>

                    {/* Product Form */}
                    <div className={`product-form ${data.category ? "show-form" : ""}`}>
                        {data.category && (
                            <div className="form-content">
                                <h3>Add {data.category}</h3>
                                <input
                                    type="text"
                                    name="productName"
                                    placeholder="Product Name"
                                    value={data.productName}
                                    onChange={handleOnChange}
                                />
                                <input
                                    type="text"
                                    name="description"
                                    placeholder="Description"
                                    value={data.description}
                                    onChange={handleOnChange}
                                />
                                <input
                                    type="number"
                                    name="price"
                                    placeholder="Selling Price (₹)"
                                    value={data.price}
                                    onChange={handleOnChange}
                                />
                                <input
                                    type="text"
                                    name="whatsapp"
                                    placeholder="Your WhatsApp Number"
                                    value={data.whatsapp}
                                    onChange={handleOnChange}
                                />
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Your Email ID"
                                    value={data.email}
                                    onChange={handleOnChange}
                                />

                                {/* File Upload (Supports Multiple Images) */}
                                <label className="upload-box">
                                    <input type="file" className="hidden" multiple onChange={handleImageUpload} />
                                    <div className="upload-placeholder">
                                        <UploadCloud size={40} className="upload-icon" />
                                        <p>Upload Product Images</p>
                                    </div>
                                </label>

                                {/* Image Previews */}
                                <div className="image-preview-container">
                                    {data.productImage.map((img, index) => (
                                        <div key={index} className="preview-wrapper">
                                            <img src={img} alt="Preview" className="preview-image" />
                                            <button onClick={() => handleDeleteProductImage(index)}>
                                                <FaTrash />
                                            </button>
                                        </div>
                                    ))}
                                </div>

                                <button className="submit-btn" onClick={handleSubmit}>Submit</button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            {/* Footer */}
            <Footer />
        </div>
    );
};

export default Sell;
