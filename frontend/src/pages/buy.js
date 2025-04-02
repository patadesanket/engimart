import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Footer from "../components/Footer";
import { FaArrowLeft, FaWhatsapp, FaEnvelope } from "react-icons/fa";

const Buy = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [productData, setProductData] = useState(null);
    const [mainImage, setMainImage] = useState("");

    // Fetch product details from location.state
    useEffect(() => {
        if (location.state?.product) {
            setProductData(location.state.product);
            setMainImage(location.state.product.images[0]); // Set first image as default
        }
    }, [location.state]);

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
                    {productData.images.map((img, index) => (
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
                    <p className="price">₹{productData.price}</p>

                    <div className="contact-section">
                        <p>Contact Seller:</p>
                        <a href={`https://wa.me/${productData.contact.whatsapp}`} target="_blank" rel="noopener noreferrer">
                            <FaWhatsapp /> WhatsApp
                        </a>
                        <a href={`mailto:${productData.contact.email}`}>
                            <FaEnvelope /> Email
                        </a>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default Buy;
