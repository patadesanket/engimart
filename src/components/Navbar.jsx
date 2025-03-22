import React from 'react';
import './Navbar.css';

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
        <button className="sell-btn">Sell</button>
        <button className="login-btn">Login</button>
      </div>
    </nav>
  );
};

export default Navbar;
