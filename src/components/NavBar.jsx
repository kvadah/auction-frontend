import { Link } from "react-router-dom";

export default function Navbar() {
  const logout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <nav style={{
      background: "#333",
      padding: "10px",
      color: "white",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center"
    }}>
      <h2>Auction App</h2>

      <div style={{ display: "flex", gap: "15px" }}>
        <Link to="/auctions" style={{ color: "white" }}>Auctions</Link>
        <Link to="/create" style={{ color: "white" }}>Create</Link>
        <button onClick={logout}>Logout</button>
      </div>
    </nav>
  );
}
