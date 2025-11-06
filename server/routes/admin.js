const express = require('express');
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// Admin Login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Admin finden
    const admin = await Admin.findOne({ username });
    if (!admin) {
      return res.status(401).json({ message: 'Falsche Zugangsdaten' });
    }

    // Passwort prüfen
    const isMatch = await admin.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Falsche Zugangsdaten' });
    }

    // JWT Token erstellen
    const token = jwt.sign(
      { adminId: admin._id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Token als HTTP-only Cookie senden
    res.cookie('adminToken', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 Tage
    });

    res.json({ message: 'Login erfolgreich' });
  } catch (error) {
    res.status(500).json({ message: 'Server Fehler' });
  }
});

// Admin Logout
router.post('/logout', (req, res) => {
  res.clearCookie('adminToken');
  res.json({ message: 'Logout erfolgreich' });
});

// Prüfe ob eingeloggt
router.get('/check', authMiddleware, (req, res) => {
  res.json({ authenticated: true });
});

module.exports = router;