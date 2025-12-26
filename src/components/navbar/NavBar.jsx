import React from "react";
import "./NavBar.css"; // Import the CSS file

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <div className="logo">AuctionX</div>

        {/* Links */}
        <ul className="nav-links">
          <li>Home</li>
          <li>Auctions</li>
          <li>Categories</li>
          <li>How It Works</li>
          <li>Contact</li>
        </ul>

        {/* Buttons */}
        <div className="nav-buttons">
          <button className="signin-btn">Sign In</button>
        </div>

        {/* Mobile menu placeholder */}
        <div className="mobile-menu">☰</div>
      </div>
    </nav>
  );
}
