import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
import './Home.css';
import Footer from '../components/Footer';
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";



const products_hero = [
  {
    name: 'Scientific calculator',
    description: 'Advanced calculators used for complex engineering calculations.',
    image: require('../assets/Heropic/calci_without_bg.png'),
  },
  {
    name: ' Workshop Apron',
    description: 'Engineering College Aprons,Worn in workshops and labs for safety.',
    image: require('../assets/Heropic/apron_without_bg.png'),
  },
  {
    name: 'Drawing tools',
    description: 'Drwaing tools used for the perfect , high quality 3d Engineering drawing',
    image: require('../assets/Heropic/tools_without_bg.png'),
  }
];

const products_main = [
  { 
    image: require('../assets/Heropic/calculator.jpg'), 
    name: "Scienticfic Calculator", 
    price: 499, 
    original_price: "1099 " 
  },
  { 
    image: require('../assets/Heropic/Apron.jpg'), 
    name: "Workshop Apron", 
    price: 250, 
    original_price: "499" 
  },
  { 
    image: require('../assets/Heropic/engg tools.jpeg'), 
    name: "Workshop Tools Kit", 
    price: 599, 
    original_price: "1200" 
  },
  { 
    image: require('../assets/Heropic/Multimeter.jpg'), 
    name: "Multimeter", 
    price: 500, 
    original_price: "1200" 
  },
  { 
    image: require('../assets/Heropic/bread_borad.jpg'), 
    name: "Bread Board", 
    price: 600, 
    original_price: "1300" 
  },
  { 
    image: require('../assets/Heropic/Microcontroller.jpg'), 
    name: "Microcontroller", 
    price: 300, 
    original_price: "500" 
  },
  { 
    image: require('../assets/Heropic/drafter.jpg'), 
    name: "Drafter", 
    price: 600, 
    original_price: "1400" 
  },
  { 
    image: require('../assets/Heropic/Drawing_sheet.jpg'), 
    name: "Drawing Sheet - Set of 5 ", 
    price: 50, 
    original_price: "75" 
  },
  { 
    image: require('../assets/Heropic/set_sqaure.jpg'), 
    name: "Set Sqaure", 
    price: 20, 
    original_price: "35" 
  },
  { 
    image: require('../assets/Heropic/Sensor.jpg'), 
    name: "sensor ", 
    price: 350, 
    original_price: "800" 
  },
  { 
    image: require('../assets/Heropic/roller_scale_big.jpg'), 
    name: "Roller scale - 30cm ", 
    price: 35, 
    original_price: "60" 
  },
  { 
    image: require('../assets/Heropic/resistors capacitors.jpg'), 
    name: "Resistor and Capacitors set", 
    price: 100, 
    original_price: "150" 
  },
  { 
    image: require('../assets/Heropic/jumper wire.jpg'), 
    name: "Jumper Wire set ", 
    price: 50, 
    original_price: "120" 
  },
  { 
    image: require('../assets/Heropic/french_curve.jpg'), 
    name: "French curve ", 
    price: 15, 
    original_price: "40" 
  },
  { 
    image: require('../assets/Heropic/Mechanical_pencil.jpg'), 
    name: "Mechanical Pencil - 0.5mm  ", 
    price: 25, 
    original_price: "60" 
  },
  // Add more products...
];

const Home = () => {
  // const navigate = useNavigate(); 
  const words = ["Products", "Tools", "Aprons", "Stationary"];
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
  // const handleBuyNow = (product) => {
  //   navigate('/buy', { state: { product } });
  // };

  
  return (
    <div>
       <div className="hero-section">
        
        <div className="tagline">
          <h1>
          <span className="engimart">Engimart</span>
          <br></br>
          <br></br>
            Discover the Best <span className="animated-text">{words[currentWordIndex]}</span>
          </h1>

        </div>
         <div className="product-showcase">
          <button className="arrow-btn" onClick={prevProduct}> <FiChevronLeft /></button>

          <div className="producth-card">
            <img src={products_hero[productIndex].image} alt={products_hero[productIndex].name} className="producth-image" />
            <div className="producth-info">
              <h2>{products_hero[productIndex].name}</h2>
              <p>{products_hero[productIndex].description}</p>
              <button className="buy-now">Buy Now</button>
            </div>
          </div>

          <button className="arrow-btn" onClick={nextProduct}><FiChevronRight /></button>
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
          <p className="product-original_price">{product.original_price}</p>
          <button className="buy-btn"  >Buy Now</button> 
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
