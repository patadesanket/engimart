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
    const [userName, setUserName] = useState("");
    const [whatsappLink, setWhatsappLink] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);  

    useEffect(() => {
        if (!location.state?.product) {
            navigate("/");
        } else {
            setProductData(location.state.product);
            setMainImage(location.state.product.image?.[0] || "");
        }
    }, [location.state, navigate]);

    useEffect(() => {
        const storedName = localStorage.getItem("userName");
        const token = localStorage.getItem("token"); 
        console.log("Fetched userName from localStorage:", storedName);

        setUserName(storedName || "a potential buyer");
        setIsLoggedIn(!!token); 
    }, []);

    useEffect(() => {
        if (productData && userName) {
            const message = `Hello 👋, I am ${userName}.\n\n` +
                `I'm interested in your product:\n\n` +
                `🛒 Product Name: ${productData.title}\n` +
                `📝 Description: ${productData.description}\n` +
                `💵 Price: ₹${productData.price}\n\n` +
                `Could you please provide more details?\n\nThank you! 🙏`;

            if (productData.whatsapp) {
                setWhatsappLink(`https://wa.me/${productData.whatsapp}?text=${encodeURIComponent(message)}`);
            }
        }
    }, [productData, userName]);

    if (!productData) {
        return <h1>Loading...</h1>;
    }

    return (
        <div className="buying-page">
            <div className="back-nav" onClick={() => navigate(-1)}>
                <FaArrowLeft /> <span>Explore more products</span>
            </div>

            <div className="product-container">
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

                <div className="main-image">
                    <img src={mainImage} alt="Product" />
                </div>

                <div className="product-details">
                    <h2>{productData.title}</h2>
                    <p className="description">{productData.description}</p>
                    <p className="price">Price: ₹{productData.price}</p>

                    {/* Contact Section */}
                    <div className="contact-section">
                        <p>Contact Seller:</p>

                        {isLoggedIn ? (
                            <>
                                {/* WhatsApp Button */}
                                {whatsappLink && (
                                    <a
                                        href={whatsappLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="whatsapp-btn"
                                    >
                                        <FaWhatsapp /> Chat on WhatsApp
                                    </a>
                                )}

                                {/* Email Button */}
                                {productData.email && (
                                    <a
                                        href={`mailto:${productData.email}?subject=Interest%20in%20your%20product&body=${encodeURIComponent(
                                            `Hello,\n\nI hope you are doing well!\n\n` +
                                            `I am interested in purchasing your product:\n\n` +
                                            `🛒 Product Name: ${productData.title}\n` +
                                            `📝 Description: ${productData.description}\n` +
                                            `💵 Price: ₹${productData.price}\n\n` +
                                            `Please let me know the next steps.\n\nThank you!`
                                        )}`}
                                        className="email-btn"
                                    >
                                        <FaEnvelope /> Contact via Email
                                    </a>
                                )}
                            </>
                        ) : (
                            <p className="login-reminder">Please <span onClick={() => navigate('/login')} className="login-link">log in</span> to contact the seller.</p>
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
