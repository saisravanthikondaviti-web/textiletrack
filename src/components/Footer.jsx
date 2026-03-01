import React from "react";
import { Link } from "react-router-dom";
import "../styles.css";

export default function Footer() {
  return (
    <footer className="premium-footer">
      <div className="footer-container">
        <div className="footer-column">
          <h2 className="footer-logo">TextileTrack</h2>
          <p>
            Discover and shop India’s finest traditional textiles from trusted
            artisans across the country.
          </p>
        </div>

        <div className="footer-column">
          <h3>Quick Links</h3>
          <Link to="/user">Home</Link>
          <Link to="/user/products">Products</Link>
          <Link to="/user/cart">Cart</Link>
          <Link to="/user/orders">Orders</Link>
        </div>

        <div className="footer-column">
          <h3>Support</h3>
          <p>Email: support@textiletrack.in</p>
          <p>Phone: +91 98765 43210</p>
          <p>India</p>
        </div>

        <div className="footer-column">
          <h3>Follow Us</h3>
          <p>Instagram</p>
          <p>Facebook</p>
          <p>Twitter</p>
        </div>
      </div>

      <div className="footer-bottom">
        © {new Date().getFullYear()} TextileTrack India. All Rights Reserved.
      </div>
    </footer>
  );
}