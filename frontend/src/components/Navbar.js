import React, { useState, useEffect } from "react";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
    window.location.reload();
  };

  const scrollToAbout = (event) => {
    event.preventDefault();
    document.getElementById("about-section").scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className="navbar">
      {/* Left Section - Engimart Title */}
      <div className="navbar-left">
        <h1>Engimart</h1>
      </div>

      {/* Center Section - Search Box */}
      <div className="navbar-center">
        <input
          type="text"
          placeholder="Search products..."
          className="search-box"
        />
      </div>

      {/* Right Section - Sell, Login, About */}
      <div className="navbar-right">
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

         <a href="#about-section" className="about-link" onClick={scrollToAbout}>
          About
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
