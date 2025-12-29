import React, { useState, useEffect } from "react";
import api from "../api/axios"; // axios instance with interceptor
import { useNavigate } from "react-router-dom";

export default function CreateAuction() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState("");
  const [ends, setEnds] = useState("");
  const [image, setImage] = useState(null);

  const navigate = useNavigate();
  const token = localStorage.getItem("access");

 
  const submitAuction = async () => {
    if (!image) return alert("Image is required!");

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", desc);
    formData.append("starting_price", price);
    formData.append("ends_at", ends);
    formData.append("image", image);

    try {
      await api.post("auctions/create/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Auction created!");
      navigate("/");
    } catch (err) {
      console.log(err.response || err);
      alert(err.response?.data?.detail || "Error creating auction.");
    }
  };

  return (
    <div style={{ padding: 20, maxWidth: 500 }}>
      <h2>Create Auction</h2>
      <input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
      <textarea placeholder="Description" value={desc} onChange={(e) => setDesc(e.target.value)} />
      <input type="number" placeholder="Starting Price" value={price} onChange={(e) => setPrice(e.target.value)} />
      <input type="datetime-local" value={ends} onChange={(e) => setEnds(e.target.value)} />
      <input type="file" onChange={(e) => setImage(e.target.files[0])} />
      <button type="button" onClick={submitAuction}>Submit Auction</button>
    </div>
  );
}
