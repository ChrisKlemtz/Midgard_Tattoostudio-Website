require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/database');

// Routes importieren
const adminRoutes = require('./routes/admin');
const galleryRoutes = require('./routes/gallery');
const servicesRoutes = require('./routes/services');

const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:5173', // Vite Dev Server
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

// Datenbank verbinden
connectDB();

// Routes
app.use('/api/admin', adminRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/services', servicesRoutes);

// Test Route
app.get('/', (req, res) => {
  res.json({ message: '🎨 Tattoo Studio API läuft!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server läuft auf Port ${PORT}`);
});