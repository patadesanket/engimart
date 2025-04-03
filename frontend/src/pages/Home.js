import React, { useState, useEffect } from "react";
import axios from "axios"; // Import axios
import "./Home.css";
import Footer from "../components/Footer";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";


const Home = () => {
  const words = ["Products", "Tools", "Aprons", "Stationary"];
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [productIndex, setProductIndex] = useState(0);
  const [products, setProducts] = useState([]); // State to store products

  // Fetch products from the backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5050/api/products"); // Replace with your actual backend URL
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const nextProduct = () => {
    setProductIndex((prevIndex) => (prevIndex + 1) % products.length);
  };

  const prevProduct = () => {
    setProductIndex((prevIndex) => (prevIndex - 1 + products.length) % products.length);
  };

  return (
    <div>
      <div className="hero-section">
        <div className="tagline">
          <h1>
            <span className="engimart">Engimart</span>
            <br />
            <br />
            Discover the Best <span className="animated-text">{words[currentWordIndex]}</span>
          </h1>
        </div>

        {products.length > 0 && (
          <div className="product-showcase">
            <button className="arrow-btn" onClick={prevProduct}>
              <FiChevronLeft />
            </button>

            <div className="producth-card">
              <img src={products[productIndex].image[0]} alt={products[productIndex].title} className="producth-image" />
              <div className="producth-info">
                <h2>{products[productIndex].title}</h2>
                <p>{products[productIndex].description}</p>
                <button className="buy-now">Buy Now</button>
              </div>
            </div>

            <button className="arrow-btn" onClick={nextProduct}>
              <FiChevronRight />
            </button>
          </div>
        )}
      </div>

      <section className="product-section">
        <h2 className="section-title">Our Featured Products</h2>

        <div className="product-grid">
          {products.map((product, index) => (
            <div className="product-card" key={index}>
              <img src={product.image[0]} alt={product.title} className="product-img" />
              <div className="product-details">
                <p className="product-name">{product.title}</p>
                <p className="product-price">₹{product.price}</p>
                <p className="product-original_price">{product.original_price || ""}</p>
                <button className="buy-btn">Buy Now</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
