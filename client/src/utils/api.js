import axios from 'axios';

// API Base URL
const API_URL = 'http://localhost:5000/api';

// Axios Instanz mit Credentials
const api = axios.create({
  baseURL: API_URL,
  withCredentials: true, // Wichtig für Cookies
  headers: {
    'Content-Type': 'application/json'
  }
});

// --- GALLERY API ---
export const galleryAPI = {
  // Alle Bilder holen
  getAll: () => api.get('/gallery'),
  
  // Bild hochladen
  upload: (formData) => api.post('/gallery', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  
  // Bild löschen
  delete: (id) => api.delete(`/gallery/${id}`)
};

// --- SERVICES API ---
export const servicesAPI = {
  getAll: () => api.get('/services'),
  create: (data) => api.post('/services', data),
  update: (id, data) => api.put(`/services/${id}`, data),
  delete: (id) => api.delete(`/services/${id}`)
};

// --- ADMIN API ---
export const adminAPI = {
  login: (credentials) => api.post('/admin/login', credentials),
  logout: () => api.post('/admin/logout'),
  check: () => api.get('/admin/check')
};

export default api;