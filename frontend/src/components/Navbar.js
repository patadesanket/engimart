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

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <a href="#about">About</a>
        <a href="#contact">Contact</a>
      </div>

      <div className="navbar-center">
        <h1>Engimart</h1>
      </div>

      <div className="navbar-right">
        <input
          type="text"
          placeholder="Search products..."
          className="search-box"
        />
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
      </div>
    </nav>
  );
};

export default Navbar;
