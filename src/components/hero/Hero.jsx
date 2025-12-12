import React from "react";
import "./Hero.css";

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1>Bid Smarter. Sell Faster.</h1>
        <p>A secure and transparent online auction platform where buyers and sellers meet.</p>
        <div className="hero-buttons">
          <button className="start-btn">Start Bidding</button>
          <button className="sell-btn">Sell an Item</button>
        </div>
      </div>
    </section>
  );
}
