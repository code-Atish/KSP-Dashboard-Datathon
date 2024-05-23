// src/Components/Footer/Footer.jsx
import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-links">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="#">Home</a></li>
              <li><a href="#">Location</a></li>
              <li><a href="#">About Us</a></li>
              <li><a href="#">Contact</a></li>
            </ul>
          </div>
          <div className="footer-info">
            <h4>Contact Us</h4>
            <p>Email: contact@kspolice.com</p>
            <p>Phone: +91 12345 67890</p>
            <p>Address: Karnataka State Police, Bangalore, India</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2024 Karnataka State Police. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
