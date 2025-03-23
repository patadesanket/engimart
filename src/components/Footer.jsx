import React from 'react';
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from 'react-icons/fa';
import './Footer.css'
const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">

        {/* Left - Useful Links and Social Icons */}
        <div className="footer-left">
          <h3>Useful Links</h3>
          <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">Products</a></li>
            <li><a href="#">Deals</a></li>
            {/* <li><a href="#">About Us</a></li> */}
            <li><a href="#">Privacy Policy</a></li>
          </ul>

          <h3>Follow Us</h3>
          <div className="social-icons">
            <a href="#"><FaFacebook /></a>
            <a href="#"><FaInstagram /></a>
            <a href="#"><FaTwitter /></a>
            <a href="#"><FaLinkedin /></a>
          </div>
        </div>

        {/* Right - Contact Us Form */}
        <div className="footer-right">
          <h3>Contact Us</h3>
          <form>
            <input type="text" placeholder="Your Name" required />
            <input type="email" placeholder="Your Email" required />
            <textarea placeholder="Your Message" required></textarea>
            <button type="submit">Send</button>
          </form>
        </div>

      </div>

      {/* Bottom Copyright */}
      <div className="footer-bottom">
        <p>&copy; 2025 Engimart. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
