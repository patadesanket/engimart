import React from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      {/* Left Section */}
      <div className="navbar-left">
        <a href="#about">About</a>
        <a href="#contact">Contact</a>
      </div>

      {/* Center Logo/Title */}
      <div className="navbar-center">
        <h1>Engimart</h1>
      </div>

      {/* Right Section */}
      <div className="navbar-right">
        <input type="text" placeholder="Search products..." className="search-box" />
        <Link to="/sell" className="sell-btn"  style={{ textDecoration: 'none' }}>Sell +</Link>
        <Link to="/login" className="login-btn " style={{ textDecoration: 'none' }}>Login</Link>
      </div>
    </nav>
  );
};

export default Navbar;
