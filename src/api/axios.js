import axios from "axios";
import { refreshToken } from "./auth";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api/",
});

// Add access token to each request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Refresh token automatically if access expired
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // avoid infinite loop
      try {
        const newAccess = await refreshToken(); // get new access
        originalRequest.headers.Authorization = `Bearer ${newAccess}`;
        return axios(originalRequest); // retry original request
      } catch {
        // refresh failed → logout
        localStorage.clear();
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default api;
