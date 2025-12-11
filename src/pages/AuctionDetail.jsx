import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function AuctionDetail() {
  const { id } = useParams();
  const [auction, setAuction] = useState(null);
  const [bids, setBids] = useState([]);
  const [amount, setAmount] = useState("");
  const [ws, setWs] = useState(null);

  const userId = localStorage.getItem("userId"); // Current logged-in user id
  const token = localStorage.getItem("accessToken"); // JWT for HTTP requests

  useEffect(() => {
    fetchAuction();
    fetchBids();
    setupWebSocket();

    // Clean up on unmount
    return () => {
      if (ws) ws.close();
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Fetch auction details
  const fetchAuction = async () => {
    try {
      const res = await axios.get(`http://localhost:8000/api/auctions/${id}/`);
      setAuction(res.data);
      setBids(res.data.bids || []);
    } catch (err) {
      console.error("Failed to fetch auction:", err);
    }
  };

  // Fetch bids via REST initially
  const fetchBids = async () => {
    try {
      const res = await axios.get(`http://localhost:8000/api/bids/?auction=${id}`);
      setBids(res.data);
    } catch (err) {
      console.error("Failed to fetch bids:", err);
    }
  };

  // Setup WebSocket
  const setupWebSocket = () => {
    const socket = new WebSocket(`ws://localhost:8000/ws/auction/${id}/`);

    socket.onopen = () => {
      console.log("WebSocket connected");
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.bidder) {
        // New bid received
        setBids(prev => [{ 
          id: prev.length + 1, // dummy id if needed
          bidder_name: data.bidder,
          amount: parseFloat(data.amount),
          created_at: data.created_at
        }, ...prev]);

        // Update current price
        setAuction(prev => ({ ...prev, current_price: parseFloat(data.amount) }));
      } else if (data.error) {
        alert(data.error);
      }
    };

    socket.onclose = () => console.log("WebSocket disconnected");
    socket.onerror = (err) => console.error("WebSocket error:", err);

    setWs(socket);
  };

  // Place bid via WebSocket
  const placeBid = () => {
    if (!amount) return alert("Enter bid amount!");
    if (!userId) return alert("User not logged in!");

    ws.send(JSON.stringify({
      user_id: userId,
      amount: parseFloat(amount)
    }));

    setAmount(""); // clear input
  };

  if (!auction) return <p>Loading auction...</p>;

  return (
    <div style={{ padding: 20, maxWidth: 600 }}>
      <h2>{auction.title}</h2>
      <img
        src={auction.image.startsWith("http") ? auction.image : `http://127.0.0.1:8000${auction.image}`}
        alt={auction.title}
        style={{ width: "100%", borderRadius: 8, marginBottom: 20 }}
      />
      <p>{auction.description}</p>
      <p><b>Starting Price:</b> ${auction.starting_price}</p>
      <p><b>Current Price:</b> ${auction.current_price}</p>
      <p><b>Ends At:</b> {new Date(auction.ends_at).toLocaleString()}</p>

      <h3>Place a Bid</h3>
      <input
        type="number"
        placeholder="Enter your bid"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        style={{ marginRight: 10 }}
      />
      <button onClick={placeBid}>Submit Bid</button>

      <h3 style={{ marginTop: 30 }}>Live Bids</h3>
      {bids.length === 0 ? (
        <p>No bids yet</p>
      ) : (
        <ul>
          {bids.map((b, idx) => (
            <li key={idx}>
              <b>{b.bidder_name}:</b> ${b.amount} — {new Date(b.created_at).toLocaleString()}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
