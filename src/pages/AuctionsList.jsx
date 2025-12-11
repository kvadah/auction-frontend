import { useEffect, useState } from "react";
import { getAuctions } from "../api/auctions";

export default function AuctionList() {
  const [auctions, setAuctions] = useState([]);

  useEffect(() => {
    getAuctions().then(setAuctions);
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>Available Auctions</h2>

      <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
        {auctions.map(a => (
          <div key={a.id} style={{
            width: 250,
            border: "1px solid #ddd",
            borderRadius: 8,
            padding: 10
          }}>
            <img 
              src={`http://127.0.0.1:8000${a.image}`} 
              alt="" 
              style={{ width: "100%", borderRadius: 6 }}
            />

            <h3>{a.title}</h3>
            <p>Current: ${a.current_price}</p>

            <button onClick={() => window.location.href = `/auction/${a.id}`}>
              View
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
