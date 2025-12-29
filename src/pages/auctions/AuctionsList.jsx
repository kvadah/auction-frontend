import { useEffect, useState } from "react";
import { getAuctions } from "../../api/auctions";
import "./AuctionsList.css";

const CATEGORIES = [
  { label: "All", value: "all" },
  { label: "Technology", value: "Technology" },
  { label: "Household", value: "Household" },
  { label: "Clothing", value: "Clothing" },
  { label: "Books", value: "Books" },
  { label: "Sports", value: "Sports" },
  { label: "Toys", value: "Toys" },
  { label: "Furniture", value: "Furniture" },
  { label: "Automotive", value: "Automotive" },
    { label: "Others", value: "Others" },

];


function Countdown({ endTime }) {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      const diff = new Date(endTime) - new Date();

      if (diff <= 0) {
        setTimeLeft("Ended");
        clearInterval(interval);
        return;
      }

      const d = Math.floor(diff / (1000 * 60 * 60 * 24));
      const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const m = Math.floor((diff / (1000 * 60)) % 60);
      const s = Math.floor((diff / 1000) % 60);

      setTimeLeft(`${d}d ${h}h ${m}m ${s}s`);
    }, 1000);

    return () => clearInterval(interval);
  }, [endTime]);

  return (
    <div className="ends-in">
      Ends in <span>{timeLeft}</span>
    </div>
  );
}

export default function AuctionsShowcase() {
  const [auctions, setAuctions] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  useEffect(() => {
    getAuctions().then(setAuctions);
  }, []);

  const filteredAuctions = auctions.filter(a => {
    const matchesCategory =
      activeCategory === "all" || a.category === activeCategory;
    const matchesSearch = a.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="auctions-wrapper">
      {/* Section Title */}
      <h2 className="section-title center">Recent Auctions</h2>

      {/* Search Bar */}
      <div className="auction-controls">
        <input
          type="text"
          placeholder="Search auctions..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          className="auction-search"
        />

        {/* Category Filters */}
        <div className="auction-categories">
          {CATEGORIES.map(cat => (
            <button
              key={cat.value}
              className={`category-btn ${
                activeCategory === cat.value ? "active" : ""
              }`}
              onClick={() => setActiveCategory(cat.value)}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Auction Grid */}
      <section className="auction-showcase">
        {filteredAuctions.map(a => (
          <div key={a.id} className="auction-card">
            <Countdown endTime={a.ends_at} />

            <img
              src={`http://127.0.0.1:8000${a.image}`}
              alt={a.title}
              className="auction-image"
            />

            <div className="auction-content">
              <h2>{a.title}</h2>
              <p className="description">{a.description}</p>

              <div className="prices">
                <div>
                  <span>Starting</span>
                  <strong>${a.starting_price}</strong>
                </div>
                <div>
                  <span>Current</span>
                  <strong className="current">${a.current_price}</strong>
                </div>
              </div>

              <div className="footer">
                <span className="total-bids">
                  Bids: <strong>{a.bids?.length || 0}</strong>
                </span>

                <button
                  className="cta-btn"
                  onClick={() => (window.location.href = `/auction/${a.id}`)}
                >
                  Place Bid
                </button>
              </div>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
