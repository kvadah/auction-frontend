import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function CreateAuction() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState("");
  const [ends, setEnds] = useState("");
  const [image, setImage] = useState(null);

  const navigate = useNavigate();
  const token = localStorage.getItem("accessToken");

  // Redirect to login if no token
  if (!token) {
    navigate("/login");
    return null;
  }

  const submitAuction = async () => {
    if (!image) return alert("Image is required!");

    const form = new FormData();
    form.append("title", title);
    form.append("description", desc);
    form.append("starting_price", price);
    form.append("ends_at", ends);
    form.append("image", image);

    try {
      await axios.post(
        "http://localhost:8000/api/auctions/create/",
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`, // JWT token
            "Content-Type": "multipart/form-data",
          },
        }
      );
      alert("Auction created!");
      navigate("/auctions"); // redirect to auction list
    } catch (err) {
      console.log(err.response || err);
      alert(
        err.response?.data?.detail ||
          "Error creating auction. Make sure your token is valid."
      );
    }
  };

  return (
    <div style={{ padding: 20, maxWidth: 500 }}>
      <h2>Create Auction</h2>

      <input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{ width: "100%", marginBottom: 10 }}
      />

      <textarea
        placeholder="Description"
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
        style={{ width: "100%", marginBottom: 10 }}
      ></textarea>

      <input
        type="number"
        placeholder="Starting Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        style={{ width: "100%", marginBottom: 10 }}
      />

      <input
        type="datetime-local"
        value={ends}
        onChange={(e) => setEnds(e.target.value)}
        style={{ width: "100%", marginBottom: 10 }}
      />

      <input
        type="file"
        onChange={(e) => setImage(e.target.files[0])}
        style={{ width: "100%", marginBottom: 10 }}
      />

      <button onClick={submitAuction} style={{ width: "100%" }}>
        Submit Auction
      </button>
    </div>
  );
}
