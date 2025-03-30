import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserCircle, FaEdit, FaTrash, FaArrowRight, FaCar, FaHome, FaMobileAlt, FaBriefcase, FaBicycle, FaTv, FaTruck } from "react-icons/fa";
import { X, UploadCloud } from "lucide-react";
import "./sell.css";
import Footer from "../components/Footer";

const Sell = () => {
    const navigate = useNavigate();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [products, setProducts] = useState([
        { id: 1, title: "Smartphone", price: "₹15,000", image: "https://via.placeholder.com/150" },
        { id: 2, title: "Laptop", price: "₹45,000", image: "https://via.placeholder.com/150" },
        { id: 3, title: "Bike", price: "₹80,000", image: "https://via.placeholder.com/150" },
        { id: 4, title: "Watch", price: "₹5,000", image: "https://via.placeholder.com/150" },
        { id: 5, title: "Headphones", price: "₹3,000", image: "https://via.placeholder.com/150" },
    ]);

    const [selectedCategory, setSelectedCategory] = useState(null);
    const [productImage, setProductImage] = useState(null);

    const categories = [
        { name: "Cars", icon: <FaCar /> },
        { name: "Properties", icon: <FaHome /> },
        { name: "Mobiles", icon: <FaMobileAlt /> },
        { name: "Jobs", icon: <FaBriefcase /> },
        { name: "Bikes", icon: <FaBicycle /> },
        { name: "Electronics & Appliances", icon: <FaTv /> },
        { name: "Commercial Vehicles & Spares", icon: <FaTruck /> },
    ];

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login");
        }
    }, [navigate]);

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    // const handleImageUpload = (event) => {
    //     const file = event.target.files[0];
    //     if (file) {
    //         setProductImage(URL.createObjectURL(file));
    //     }
    // };
    const [productImages, setProductImages] = useState([]);

const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    const imageUrls = files.map((file) => URL.createObjectURL(file));
    setProductImages((prevImages) => [...prevImages, ...imageUrls]);
};

    return (
        <div>
            {/* Navbar */}
            <nav className="seller-navbar">
                <div className="navbar-title">Engimart Sellers</div>
                <input
                    type="text"
                    placeholder="Search..."
                    className="navbar-search"
                />
                <div className="navbar-links">
                    <a href="#">About</a>
                    <a href="#">Contact</a>
                </div>
                <div className="profile-section">
                    <button className="profile-btn" onClick={toggleDropdown}>
                        <FaUserCircle size={24} />
                        Profile
                    </button>
                    {dropdownOpen && (
                        <div className="dropdown-menu">
                            <button onClick={handleLogout}>Logout</button>
                        </div>
                    )}
                </div>
            </nav>

            {/* Listed Products Section */}
            <div className="listed-products">
                <h2 className="section-title">Your Listed Products</h2>
                <div className="product-grid">
                    {products.map((product) => (
                        <div key={product.id} className="product-card">
                            <img src={product.image} alt={product.title} />
                            <div className="product-info">
                                <h3>{product.title}</h3>
                                <p>{product.price}</p>
                            </div>
                            <div className="product-actions">
                                <button className="edit-btn"><FaEdit /> Edit</button>
                                <button className="delete-btn"><FaTrash /> Delete</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* List New Product Section */}
            <div className="list-product-container">
                <h2 className="section-title">List New Product</h2>

                <div className="list-product-content">
                    {/* Category List */}
                    <div className="category-section">
                        {categories.map((category, index) => (
                            <div
                                key={index}
                                className={`category-item ${selectedCategory === category.name ? "active" : ""}`}
                                onClick={() => setSelectedCategory(category.name)}
                            >
                                <span className="category-icon">{category.icon}</span>
                                <span className="category-name">{category.name}</span>
                                <span className="category-arrow"><FaArrowRight /></span>
                            </div>
                        ))}
                    </div>

                    {/* Product Form */}
                    <div className={`product-form ${selectedCategory ? "show-form" : ""}`}>
                        {selectedCategory && (
                            <div className="form-content">
                                <h3>Add {selectedCategory}</h3>

                                {/* Updated Form */}
                                <div className="product-form-container">
                                    {/* Close Button */}
                                    <div className="form-header">
                                        <h2>Upload Product</h2>
                                        <button className="close-btn" onClick={() => setSelectedCategory(null)}>
                                            <X size={20} />
                                        </button>
                                    </div>

                                    {/* Input Fields */}
                                    <div className="form-fields">
                                        <input type="text" placeholder="Product Name" className="input-field" />
                                        <input type="text" placeholder="Description" className="input-field" />

                                        {/* Image Upload */}
                                        <label className="upload-box">
                                            <input type="file" className="hidden" multiple onChange={handleImageUpload} />
                                            <div className="upload-placeholder">
                                                <UploadCloud size={40} className="upload-icon" />
                                                <p>Upload Product Images</p>
                                            </div>
                                        </label>

                                        {/* Image Previews */}
                                        <div className="image-preview-container">
                                            {productImages.map((img, index) => (
                                                <img key={index} src={img} alt="Preview" className="preview-image" />
                                            ))}
                                        </div>

                                        {/* Price Fields */}
                                        {/* <input type="number" placeholder="Price (₹)" className="input-field" /> */}
                                        <input type="number" placeholder="Selling Price (₹)" className="input-field" />

                                        {/* WhatsApp & Email Fields */}
                                        <input type="text" placeholder="Your WhatsApp Number" className="input-field" />
                                        <input type="email" placeholder="Your Email ID" className="input-field" />

                                        {/* Submit Button */}
                                        <button className="submit-btn">Submit</button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                </div>
            </div>
            <Footer />
        </div>

    );

};

export default Sell;
