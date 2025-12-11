import { useState } from "react";
import axios from "axios";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleRegister = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await axios.post("http://127.0.0.1:8000/api/auth/register/", {
        username,
        email,
        password,
      });

      alert("Registration successful! Please login.");
      window.location.href = "/";
    } catch (err) {
      if (err.response?.data) {
        const errors = err.response.data;
        let message = "";

        if (errors.username) message += errors.username[0] + "\n";
        if (errors.email) message += errors.email[0] + "\n";
        if (errors.password) message += errors.password[0] + "\n";

        setError(message || "Registration failed");
      } else {
        setError("Something went wrong");
      }
    }

    setLoading(false);
  };

  return (
    <div style={{ maxWidth: 350, margin: "100px auto" }}>
      <h2>Create Account</h2>

      <input
        placeholder="Username"
        value={username}
        onChange={e => setUsername(e.target.value)}
        style={{ display: "block", width: "100%", marginBottom: 10 }}
      />

      <input
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        style={{ display: "block", width: "100%", marginBottom: 10 }}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        style={{ display: "block", width: "100%", marginBottom: 10 }}
      />

      <button 
        onClick={handleRegister}
        disabled={loading}
        style={{ width: "100%", padding: 10 }}
      >
        {loading ? "Registering..." : "Register"}
      </button>

      {error && (
        <p style={{ color: "red", whiteSpace: "pre-wrap", marginTop: 10 }}>
          {error}
        </p>
      )}

      <p style={{ marginTop: 10 }}>
        Already have an account? <a href="/">Login</a>
      </p>
    </div>
  );
}
