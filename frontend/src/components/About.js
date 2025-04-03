import React from "react";
import "./About.css";

const About = () => {
  return (
    <section id="about-section" className="about-container">
      <h2>About Engimart</h2>
      <p>
        Engimart is a platform designed to connect buyers and sellers in a seamless way. 
        We provide a user-friendly experience to help you sell and purchase products effortlessly.
      </p>
      <div className="about-cards">
        <div className="about-card">
          <h3>About Buying </h3>
          <ul>
            <li>Browse a wide range of products available for purchase.</li>
            <li>Click on any product to view detailed information and multiple images.</li>
            <li>Check product pricing and description before making a decision.</li>
            <li>If interested, contact the seller via WhatsApp or email for further details.</li>
            <li>Ensure to verify the product and communicate securely before finalizing the deal.</li>
          </ul>
        </div>
        <div className="about-card">
          <h3>About Selling </h3>
          <ul>
          <li>Create an account and log in to start selling your products.</li>
            <li>Click on the "Sell +" button and list your products with images, descriptions, and pricing.</li>
            <li>Ensure that product details are accurate to attract potential buyers.</li>
            <li>Buyers will contact you via WhatsApp or email to inquire about your product.</li>
            <li>Negotiate and finalize the deal, ensuring a secure transaction.</li>
          </ul>
        </div>
        <div className="about-card">
          <h3>About Developers</h3>
          <p>Meet the team behind Engimart!</p>

        <div className="developer-cards">
          <a href="https://github.com/developer1" target="_blank" rel="noopener noreferrer" className="developer-card">
            <h4>Pranay Metkari</h4>
          </a>
          <a href="https://github.com/developer2" target="_blank" rel="noopener noreferrer" className="developer-card">
            <h4>Ritvik Salian</h4>
          </a>
          <a href="https://github.com/patadesanket" target="_blank" rel="noopener noreferrer" className="developer-card">
            <h4>Sanket Patade</h4>
          </a>
        </div>
        </div>
      </div>
    </section>
  );
};

export default About;
