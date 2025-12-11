import axios from "axios";

const API = "http://127.0.0.1:8000/api/auth/login/"; // or /token/

export const loginUser = async (email, password) => {
  try {
    const res = await axios.post(API, { email, password });

    // Save tokens in localStorage
    localStorage.setItem("accessToken", res.data.access);
    localStorage.setItem("refreshToken", res.data.refresh);
    localStorage.setItem("userId", res.data.user.id);

    return res.data;
  } catch (err) {
    console.error("Login failed:", err.response?.data || err.message);
    throw err;
  }
};
