import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserCircle, FaEdit, FaTrash, FaArrowRight, FaCar, FaHome, FaMobileAlt, FaBriefcase, FaBicycle, FaTv, FaTruck } from "react-icons/fa";
import { X, UploadCloud } from "lucide-react";
import "./sell.css";
import Footer from "../components/Footer";
import axios from "axios";

const Sell = () => {
    const navigate = useNavigate();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [products, setProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [productImages, setProductImages] = useState([]);

    // Step 1: State for form inputs
    const [productName, setProductName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [whatsapp, setWhatsapp] = useState("");
    const [email, setEmail] = useState("");

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
        } else {
            fetchProducts();  // Fetch products when logged in
        }
    }, [navigate]);

    const fetchProducts = async () => {
        try {
            const response = await axios.get("http://localhost:5050/api/products");  // Fetch products from backend
            setProducts(response.data);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    const handleImageUpload = (event) => {
        const files = Array.from(event.target.files);
        const imageUrls = files.map((file) => URL.createObjectURL(file));
        setProductImages((prevImages) => [...prevImages, ...imageUrls]);
    };

    // Step 2: Handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('productName', productName);
        formData.append('description', description);
        formData.append('price', price);
        formData.append('whatsapp', whatsapp);
        formData.append('email', email);
        formData.append('category', selectedCategory);

        // Append images to FormData
        productImages.forEach((image, index) => {
            const file = dataURLtoFile(image, `product-image-${index}.jpg`);
            formData.append('images', file);
        });

        try {
            const response = await axios.post("http://localhost:5050/api/products", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            console.log("Form submitted successfully:", response.data);
            fetchProducts();  // Fetch products again to include the newly added product

            // Reset form state after successful submission
            setProductName("");
            setDescription("");
            setPrice("");
            setWhatsapp("");
            setEmail("");
            setProductImages([]);
            setSelectedCategory(null);
        } catch (error) {
            console.error("Error submitting form:", error);
        }
    };

    function dataURLtoFile(dataUrl, filename) {
    // Check if the dataUrl is not null or malformed
    if (!dataUrl || !dataUrl.includes(',')) {
        console.error("Invalid data URL:", dataUrl);
        return null; // Return null if the data URL is invalid
    }

    const arr = dataUrl.split(',');
    const mime = arr[0].match(/:(.*?);/);
    if (!mime) {
        console.error("Invalid mime type:", arr[0]);
        return null; // Return null if mime type is not found
    }

    const bstr = atob(arr[1]);
    const n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime[1] });
}


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
                    {products.length === 0 ? (
                        <p>No products listed yet.</p>
                    ) : (
                        products.map((product) => (
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
                        ))
                    )}
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
                                    <div className="form-header">
                                        <h2>Upload Product</h2>
                                        <button className="close-btn" onClick={() => setSelectedCategory(null)}>
                                            <X size={20} />
                                        </button>
                                    </div>

                                    {/* Input Fields */}
                                    <div className="form-fields">
                                        <input
                                            type="text"
                                            placeholder="Product Name"
                                            className="input-field"
                                            value={productName}
                                            onChange={(e) => setProductName(e.target.value)}
                                        />
                                        <input
                                            type="text"
                                            placeholder="Description"
                                            className="input-field"
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}
                                        />

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
                                        <input
                                            type="number"
                                            placeholder="Selling Price (₹)"
                                            className="input-field"
                                            value={price}
                                            onChange={(e) => setPrice(e.target.value)}
                                        />

                                        {/* WhatsApp & Email Fields */}
                                        <input
                                            type="text"
                                            placeholder="Your WhatsApp Number"
                                            className="input-field"
                                            value={whatsapp}
                                            onChange={(e) => setWhatsapp(e.target.value)}
                                        />
                                        <input
                                            type="email"
                                            placeholder="Your Email ID"
                                            className="input-field"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />

                                        {/* Submit Button */}
                                        <button className="submit-btn" onClick={handleSubmit}>Submit</button>
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
