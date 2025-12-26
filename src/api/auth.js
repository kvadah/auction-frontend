import axios from "axios";

const API = "http://127.0.0.1:8000/api/auth/login/";
const API_URL = "http://127.0.0.1:8000/api/auth/"; // or /token/

export const loginUser = async (email, password) => {
  try {
    const res = await axios.post(API, { email, password });

    // Save tokens in localStorage
    localStorage.setItem("access", res.data.access);
    localStorage.setItem("refresh", res.data.refresh);
    localStorage.setItem("userId", res.data.user.id);

    return res.data;
  } catch (err) {
    console.error("Login failed:", err.response?.data || err.message);
    throw err;
  }
};
export const refreshToken = async () => {
  console.log("hello")
  const refresh = localStorage.getItem("refresh");
  if (!refresh) throw new Error("No refresh token stored");

  const response = await axios.post("http://127.0.0.1:8000/api/token/refresh/", {
    refresh,
  });

  localStorage.setItem("access", response.data.access);
  return response.data.access;
};
