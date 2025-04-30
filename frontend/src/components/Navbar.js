import React, { useState, useEffect } from "react";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Navbar = ({ scrollToAbout }) => {
  const [user, setUser] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false); // NEW

  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5050/api/products");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
    window.location.reload();
  };

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.trim() === "") {
      setFilteredProducts([]);
    } else {
      const filtered = products.filter((product) =>
        product.title.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  };

  const handleProductClick = (product) => {
    navigate("/buy", { state: { product } });
    setSearchQuery("");
    setFilteredProducts([]);
  };

  return (
    <nav className="navbar">
      {/* Left Section - Engimart Title */}
      <div className="navbar-left">
        <h1>EngiMart</h1>
      </div>

      {/* Hamburger Icon */}
      <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>

      {/* Center Section - Search Box */}
      <div className="navbar-center">
        <input
          type="text"
          placeholder="Search products..."
          className="search-box"
          value={searchQuery}
          onChange={handleSearchChange}
        />
        {searchQuery && filteredProducts.length > 0 && (
          <div className="search-dropdown">
            {filteredProducts.map((product) => (
              <div
                key={product._id}
                className="search-item"
                onClick={() => handleProductClick(product)}
              >
                <img src={product.image[0]} alt={product.title} className="search-item-img" />
                <span className="search-item-title">{product.title}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Right Section - Sell, Login, About */}
      <div className={`navbar-right ${menuOpen ? "open" : ""}`}>
        <Link to="/sell" className="sell-btn" style={{ textDecoration: "none" }}>
          Sell +
        </Link>

        {user ? (
          <div className="user-menu" onClick={() => setShowDropdown(!showDropdown)}>
            <span className="username">{user.name}</span>
            <div className={`dropdown ${showDropdown ? "active" : ""}`}>
              <button onClick={handleLogout} className="logout-btn">
                Logout
              </button>
            </div>
          </div>
        ) : (
          <Link to="/login" className="login-btn" style={{ textDecoration: "none" }}>
            Login
          </Link>
        )}

        <button onClick={scrollToAbout} className="about-link-btn">
          About
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
