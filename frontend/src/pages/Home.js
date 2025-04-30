import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./Home.css";
import Footer from "../components/Footer";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import About from "../components/About";
import Navbar from "../components/Navbar"; // <== Add Navbar import here
import { Link } from "react-router-dom";
import '@google/model-viewer';

const Home = () => {
  const words = ["Products", "Tools", "Aprons", "Stationary"];
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [products, setProducts] = useState([]);
  const [modelIndex, setModelIndex] = useState(0);

  const aboutRef = useRef(null); // <== Create a reference for About section

  const models = [
    {
      title: "CASIO Advanced Calculator",
      description: "A detailed 3D model of a Casio Advanced Calculator.",
      fileName: "casio_calculator.glb",
    },
    {
      title: "Arduino Uno R3, Elegoo",
      description: "A 3D model of an Arduino Uno R3 microcontroller.",
      fileName: "arduino_uno.glb",
    },
    {
      title: "Digital MultiMeter",
      description: "A 3D model of an Digital Multimeter.",
      fileName: "multimeter.glb",
    },
    {
      title: "Workshop chisels",
      description: "Different types of chisels used in carpentary",
      fileName: "chisels.glb",
    },
    {
      title: "Electric Components",
      description: "Breadboard and other components used in electrical and IOT projects",
      fileName: "breadboard.glb",
    },
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5050/api/products");
        const sortedProducts = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setProducts(sortedProducts);
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

  const nextModel = () => {
    setModelIndex((prevIndex) => (prevIndex + 1) % models.length);
  };

  const prevModel = () => {
    setModelIndex((prevIndex) => (prevIndex - 1 + models.length) % models.length);
  };

  const scrollToAbout = () => {
    aboutRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div>
      {/* Navbar */}
      <Navbar scrollToAbout={scrollToAbout} />

      {/* Hero Section */}
      <div className="hero-section">
        <div className="tagline">
          <h1>
            <span className="engimart">EngiMart</span>
            <br />
            <br />
            Discover the Best <span className="animated-text">{words[currentWordIndex]}</span>
          </h1>
        </div>

        {/* 3D Model Showcase */}
        <div className="model-showcase">
          <button className="arrow-btn" onClick={prevModel}>
            <FiChevronLeft />
          </button>

          <div className="model-card">
            {/* <model-viewer
              src={`/models/${models[modelIndex].fileName}`}
              alt={models[modelIndex].title}
              auto-rotate
              camera-controls
              autoplay
              shadow-intensity="1"
            ></model-viewer> */}

            <model-viewer
              src={`/models/${models[modelIndex].fileName}`}
              alt={models[modelIndex].title}
              auto-rotate
              camera-controls
              autoplay
              shadow-intensity="1"
              exposure="1"
              style={{ objectFit: "contain" }}
              reveal="auto"
              loading="eager"
            ></model-viewer>


            <div className="model-info">
              <h2>{models[modelIndex].title}</h2>
              <p>{models[modelIndex].description}</p>
            </div>
          </div>

          <button className="arrow-btn" onClick={nextModel}>
            <FiChevronRight />
          </button>
        </div>
      </div>

      {/* Featured Products Section */}
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
                <Link
                  to="/buy"
                  state={{ product }}
                  className="buy-btn"
                  style={{ textDecoration: "none" }}
                >
                  Buy Now
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* About Section */}
      <div ref={aboutRef}>
        <About />
      </div>

      <Footer />
    </div>
  );
};

export default Home;
