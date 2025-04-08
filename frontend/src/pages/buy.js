import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Footer from "../components/Footer";
import { FaArrowLeft, FaWhatsapp, FaEnvelope } from "react-icons/fa";
import "./buy.css";

const Buy = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [productData, setProductData] = useState(null);
    const [mainImage, setMainImage] = useState("");

    // Fetch product details from location.state
    useEffect(() => {
        if (!location.state?.product) {
            navigate("/"); // Redirect to Home if no product is found
        } else {
            setProductData(location.state.product);
            setMainImage(location.state.product.image?.[0] || ""); // Handle undefined image array
        }
    }, [location.state, navigate]);

    // If data is missing, show loading
    if (!productData) {
        return <h1>Loading...</h1>;
    }

    return (
        <div className="buying-page">
            {/* Back Navigation */}
            <div className="back-nav" onClick={() => navigate(-1)}>
                <FaArrowLeft /> <span>Explore more products</span>
            </div>

            {/* Product Display Section */}
            <div className="product-container">
                {/* Image Column */}
                <div className="image-column">
                    {productData.image?.map((img, index) => (
                        <img
                            key={index}
                            src={img}
                            alt="Product"
                            className="thumbnail"
                            onClick={() => setMainImage(img)}
                        />
                    ))}
                </div>

                {/* Main Product Image */}
                <div className="main-image">
                    <img src={mainImage} alt="Product" />
                </div>

                {/* Product Details */}
                <div className="product-details">
                    <h2>{productData.title}</h2>
                    <p className="description">{productData.description}</p>
                    <p className="price">Price: ₹{productData.price}</p>

                    {/* Contact Section */}
                    <div className="contact-section">
                        <p>Contact Seller:</p>

                        {productData.whatsapp && (
                            <a
                                href={`https://wa.me/${productData.whatsapp}?text=${encodeURIComponent(
                                    `Hello, I am ${localStorage.getItem("userName") || "a potential buyer"}.\n\n` +
                                    `I'm interested in your product:\n🔹 Product Name: ${productData.title}\n` +
                                    `🔹 Description: ${productData.description}\n🔹 Price: ${productData.price}\n\n` +
                                    `Please let me know more details.`
                                )}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="whatsapp-btn"
                            >
                                <FaWhatsapp /> Chat on WhatsApp
                            </a>
                        )}

                        {productData.email && (
                            <a
                                href={`mailto:${productData.email}?subject=Interested%20in%20your%20product&body=${encodeURIComponent(
                                    `Hello,\n\nI am interested in your product:\n\n` +
                                    `🔹 Product Name: ${productData.title}\n` +
                                    `🔹 Description: ${productData.description}\n` +
                                    `🔹 Price: ₹${productData.price}\n\n` +
                                    `Please provide more details.\n\nThank you!`
                                )}`}
                                className="email-btn"
                            >
                                <FaEnvelope /> Contact via Email
                            </a>
                        )}
                    </div>
                </div>
            </div>

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default Buy;
