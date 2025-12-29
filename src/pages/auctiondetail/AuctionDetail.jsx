import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./AuctionDetail.css"; // We'll create this

export default function AuctionDetail() {
  const { id } = useParams();
  const [auction, setAuction] = useState(null);
  const [bids, setBids] = useState([]);
  const [amount, setAmount] = useState("");
  const [ws, setWs] = useState(null);

  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    fetchAuction();
    fetchBids();
    setupWebSocket();
    return () => { if (ws) ws.close(); };
  }, []); // eslint-disable-line

  const fetchAuction = async () => {
    try {
      const res = await axios.get(`http://localhost:8000/api/auctions/${id}/`);
      setAuction(res.data);
      setBids(res.data.bids || []);
    } catch (err) {
      console.error("Failed to fetch auction:", err);
    }
  };

  const fetchBids = async () => {
    try {
      const res = await axios.get(`http://localhost:8000/api/bids/?auction=${id}`);
      setBids(res.data);
    } catch (err) {
      console.error("Failed to fetch bids:", err);
    }
  };

  const setupWebSocket = () => {
    const socket = new WebSocket(`ws://localhost:8000/ws/auction/${id}/`);

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.bidder) {
        setBids(prev => [{ 
          id: prev.length + 1,
          bidder_name: data.bidder,
          amount: parseFloat(data.amount),
          created_at: data.created_at
        }, ...prev]);
        setAuction(prev => ({ ...prev, current_price: parseFloat(data.amount) }));
      } else if (data.error) alert(data.error);
    };

    setWs(socket);
  };

  const placeBid = () => {
    if (!amount) return alert("Enter bid amount!");
    if (!userId) return alert("User not logged in!");
    ws.send(JSON.stringify({ user_id: userId, amount: parseFloat(amount) }));
    setAmount("");
  };

  if (!auction) return <p>Loading auction...</p>;

  return (
    <div className="auction-detail-container">
      {/* Left side - Auction Info */}
      <div className="auction-main">
        <h1 className="auction-title">{auction.title}</h1>
        <img
          src={auction.image.startsWith("http") ? auction.image : `http://127.0.0.1:8000${auction.image}`}
          alt={auction.title}
          className="auction-image"
        />
        <p className="auction-desc">{auction.description}</p>
        <div className="auction-prices">
          <div><span>Starting Price:</span> <strong>${auction.starting_price}</strong></div>
          <div><span>Current Price:</span> <strong className="current-price">${auction.current_price}</strong></div>
          <div><span>Ends At:</span> {new Date(auction.ends_at).toLocaleString()}</div>
        </div>
        <div className="bid-form">
          <input
            type="number"
            placeholder="Enter your bid"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <button onClick={placeBid}>Place Bid</button>
        </div>
      </div>

      {/* Right top - Live Bids */}
      <div className="live-bids-card">
        <h3>Live Bids</h3>
        {bids.length === 0 ? (
          <p className="no-bids">No bids yet</p>
        ) : (
          <ul>
            {bids.map((b, idx) => (
              <li key={idx}>
                <span className="bidder">{b.bidder_name}</span>: <span className="amount">${b.amount}</span>
                <div className="bid-time">{new Date(b.created_at).toLocaleTimeString()}</div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
