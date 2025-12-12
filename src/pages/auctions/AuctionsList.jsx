import { useEffect, useState } from "react";
import { getAuctions } from "../../api/auctions";
import "./AuctionsList.css";

export default function AuctionList() {
  const [auctions, setAuctions] = useState([]);

  useEffect(() => {
    getAuctions().then(setAuctions);
  }, []);

  return (
    <div className="auction-container">
      <h2 className="auction-title">Available Auctions</h2>

      <div className="auction-grid">
        {auctions.map(a => (
          <div key={a.id} className="auction-card">
            <img 
              src={`http://127.0.0.1:8000${a.image}`} 
              alt={a.title} 
              className="auction-image"
            />

            <div className="auction-info">
              <h3>{a.title}</h3>
              <p className="current-price">${a.current_price}</p>
              <button 
                className="view-btn"
                onClick={() => window.location.href = `/auction/${a.id}`}
              >
                View Auction
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
