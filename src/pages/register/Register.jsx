import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Register.css"; // 👈 import CSS

export default function Register() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post(
        "https://auction-system-django-backend.onrender.com/api/auth/register/",
        form,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      navigate("/verify-email");
    } catch (error) {
      if (error.response && error.response.data) {
        alert(JSON.stringify(error.response.data));
      } else {
        alert("Something went wrong. Try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <form className="register-card" onSubmit={submit}>
        <h2>Create Account</h2>
        <p>Register and verify your email to continue</p>

        <div className="input-group">
          <label>Username</label>
          <input
            name="username"
            placeholder="Enter username"
            onChange={handleChange}
            required
          />
        </div>

        <div className="input-group">
          <label>Email</label>
          <input
            name="email"
            type="email"
            placeholder="Enter email"
            onChange={handleChange}
            required
          />
        </div>

        <div className="input-group">
          <label>Password</label>
          <input
            name="password"
            type="password"
            placeholder="Create password"
            onChange={handleChange}
            required
          />
        </div>

        <button className="register-button" type="submit" disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </button>

        <span className="footer-text">
          Already have an account? <a href="/login">Login</a>
        </span>
      </form>
    </div>
  );
}
