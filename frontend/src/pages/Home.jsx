import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import './Home.css';
import Footer from '../components/Footer';




const products_hero = [
  {
    name: 'Calcium Tablet',
    description: 'Boost your bones and strength.',
    image: require('../assets/Heropic/calci.webp'),
  },
  {
    name: 'Doctor Apron',
    description: 'Premium quality doctor apron.',
    image: require('../assets/Heropic/apron.webp'),
  },
  {
    name: 'Tool Kit',
    description: 'Complete home repair tool kit.',
    image: require('../assets/Heropic/tools.webp'),
  }
];

const products_main = [
  { 
    image: "assets/products/oneplus.jpg", 
    name: "OnePlus 13R | 12GB RAM", 
    price: 39999, 
    offer: "4% Off - Limited Deal" 
  },
  { 
    image: "assets/products/redmi.jpg", 
    name: "Redmi A4 5G | 4GB RAM", 
    price: 9999, 
    offer: "25% Off - Limited Deal" 
  },
  { 
    image: "assets/products/narzo70.jpg", 
    name: "Realme Narzo 70 Turbo 5G | 6GB RAM", 
    price: 13999, 
    offer: "15% Off - Limited Deal" 
  },
  { 
    image: "assets/products/iqooNeo10.jpg", 
    name: "iQOO Neo 10R 5G | 8GB RAM", 
    price: 23999, 
    offer: "16% Off - Limited Deal" 
  },
  { 
    image: "assets/products/vivoV50.jpg", 
    name: "Vivo V50 5G | 8GB RAM", 
    price: 25999, 
    offer: "14% Off - Limited Deal" 
  },
  { 
    image: "assets/products/oneplusNord.jpg", 
    name: "OnePlus Nord CE 3 Lite | 8GB RAM", 
    price: 18999, 
    offer: "10% Off - Limited Deal" 
  },
  { 
    image: "assets/products/galaxyM16.jpg", 
    name: "Samsung Galaxy M16 | 6GB RAM", 
    price: 15999, 
    offer: "12% Off - Limited Deal" 
  },
  { 
    image: "assets/products/iqooZ9x.jpg", 
    name: "iQOO Z9x 5G | 8GB RAM", 
    price: 14999, 
    offer: "9% Off - Limited Deal" 
  },
  { 
    image: "assets/products/redmiNote13.jpg", 
    name: "Redmi Note 13 5G | 6GB RAM", 
    price: 16999, 
    offer: "18% Off - Limited Deal" 
  },
  { 
    image: "assets/products/realmeC67.jpg", 
    name: "Realme C67 | 8GB RAM", 
    price: 13499, 
    offer: "20% Off - Limited Deal" 
  },
  // Add more products...
];

const Home = () => {

  const words = ["Products", "Deals", "Offers", "Electronics"];
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [productIndex, setProductIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, 2000); // Change word every 2 seconds
    return () => clearInterval(interval);
  }, []);

  const nextProduct = () => {
    setProductIndex((prevIndex) => (prevIndex + 1) % products_hero.length);
  };

  const prevProduct = () => {
    setProductIndex((prevIndex) => (prevIndex - 1 + products_hero.length) % products_hero.length);
  };
  return (
    <div>
      <Navbar />
      <div className="hero-section">
        {/* Tagline Section */}
        <div className="tagline">
          <h1>
            Discover the Best <span className="animated-text">{words[currentWordIndex]}</span>
          </h1>

        </div>
         <div className="product-showcase">
          <button className="arrow-btn" onClick={prevProduct}>&lt;</button>

          <div className="producth-card">
            <img src={products_hero[productIndex].image} alt={products_hero[productIndex].name} className="producth-image" />
            <div className="producth-info">
              <h2>{products_hero[productIndex].name}</h2>
              <p>{products_hero[productIndex].description}</p>
              <button className="buy-now">Buy Now</button>
            </div>
          </div>

          <button className="arrow-btn" onClick={nextProduct}>&gt;</button>
        </div> 
        

      </div>


      <section className="product-section">
  <h2 className="section-title">Our Featured Products</h2>

  <div className="product-grid">
    {products_main.map((product, index) => (
      <div className="product-card" key={index}>
        <img src={product.image} alt={product.name} className="product-img" />
        <div className="product-details">
          <p className="product-name">{product.name}</p>
          <p className="product-price">₹{product.price}</p>
          <p className="product-offer">{product.offer}</p>
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
