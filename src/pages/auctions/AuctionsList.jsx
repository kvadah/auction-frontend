import { useEffect, useState } from "react";
import { getAuctions } from "../../api/auctions";
import "./AuctionsList.css";

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

  useEffect(() => {
    getAuctions().then(setAuctions);
  }, []);

  return (
    <section className="auction-showcase">
      {auctions.map(a => (
        <div key={a.id} className="auction-row">

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
                <span>Starting Price</span>
                <strong>${a.starting_price}</strong>
              </div>
              <div>
                <span>Current Price</span>
                <strong className="current">${a.current_price}</strong>
              </div>
            </div>

            <div className="cta-wrapper">
              <div className="total-bids">
                Total Bids: <strong>{a.bids?.length || 0}</strong>
              </div>

              <button
                onClick={() => window.location.href = `/auction/${a.id}`}
                className="cta-btn"
              >
                Place Bid
              </button>
            </div>

          </div>

        </div>
      ))}
    </section>
  );
}
