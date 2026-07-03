import axios from "axios";

const BASE = import.meta.env.VITE_API_URL || "https://backend-azaratti1of1.onrender.com";

const api = axios.create({
  baseURL: BASE,
  timeout: 15000,
  headers: { "Content-Type": "application/json" },
});

// Attache automatiquement le token JWT si présent
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("azaratti_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Auth
export const authAPI = {
  signup: (data) => api.post("/api/auth/signup", data),
  login:  (data) => api.post("/api/auth/login", data),
  me:     ()     => api.get("/api/auth/me"),
};

// Products
export const productsAPI = {
  list:    (params) => api.get("/api/products", { params }),
  getById: (id)    => api.get(`/api/products/${id}`),
};

// Orders
export const ordersAPI = {
  create:   (data) => api.post("/api/orders", data),
  myOrders: ()     => api.get("/api/orders/my-orders"),
};

// Custom requests (sur mesure)
export const customAPI = {
  create: (data) => api.post("/api/custom-request", data),
};

// Contact
export const contactAPI = {
  send: (data) => api.post("/api/contact", data),
};

// Likes (pour utilisateurs connectés)
export const likesAPI = {
  getAll: ()           => api.get("/api/likes"),
  toggle: (productId) => api.post("/api/likes/toggle", { productId }),
};

export default api;
