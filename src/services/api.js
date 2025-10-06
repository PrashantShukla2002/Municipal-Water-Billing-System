import axios from "axios";

const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:8080/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 15000, // 15s timeout
  // withCredentials: true, // uncomment if you need cookies/auth via CORS
});

// Request interceptor — add auth token when available
api.interceptors.request.use(
  (config) => {
    try {
      const token = localStorage.getItem("authToken"); // adjust key if needed
      if (token) {
        config.headers = config.headers || {};
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (e) {
      // localStorage may throw in some restricted environments — ignore
      console.warn("Could not read auth token", e);
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Guard for network errors where error.response may be undefined
    const status = error.response?.status;
    const payload = error.response?.data;
    const message =
      payload?.message ||
      payload?.error ||
      (status ? `Request failed with status ${status}` : error.message) ||
      "Something went wrong";

    // Log for dev
    console.error("API Error:", status, payload ?? error.message);

    // Keep a simple user-facing alert for now (you can replace with toast)
    try {
      // avoid long objects in alert
      alert(`Error: ${typeof message === "string" ? message : JSON.stringify(message)}`);
    } catch (e) {
      // ignore alert failures
    }

    return Promise.reject(error);
  }
);

// ---------- Bill APIs ----------
// Keep axios response semantics (so existing code using response.data continues to work)
export const fetchBill = (billNumber) =>
  api.post("/bills/fetch", { billNumber });

// Alternative: server also supports GET by path — uncomment if you prefer
// export const getBill = (billNumber) => api.get(`/bills/${encodeURIComponent(billNumber)}`);

export const getBill = (billNumber) => api.get(`/bills/${encodeURIComponent(billNumber)}`);

export const getBills = (params = {}) =>
  api.get("/bills", { params }); // axios handles query params

// ---------- Payment Link APIs ----------
export const createPaymentLink = (billNumber, options = {}) =>
  api.post("/paylinks", { billNumber, channel: "link", ...options });

// ---------- Email APIs ----------
export const sendEmail = (billNumber, toEmail) =>
  api.post("/email/paylink", { billNumber, toEmail });

export default api;
