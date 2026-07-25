import axios from "axios";
import { API_BASE_URL, TOKEN_KEY, USER_KEY } from "../utils/constants";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const rawToken = localStorage.getItem(TOKEN_KEY);
  const token = rawToken?.startsWith("Bearer ") ? rawToken.slice(7) : rawToken;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.status === 401) {
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(USER_KEY);

      if (!window.location.pathname.startsWith("/login") && !window.location.pathname.startsWith("/register")) {
        window.location.assign("/login");
      }
    }
    return Promise.reject(error);
  }
);

export default api;
