const express = require('express');
const Service = require('../models/Service');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// Alle Services holen (öffentlich)
router.get('/', async (req, res) => {
  try {
    const services = await Service.find().sort({ order: 1 });
    res.json(services);
  } catch (error) {
    res.status(500).json({ message: 'Fehler beim Laden' });
  }
});

// Service erstellen (nur Admin)
router.post('/', authMiddleware, async (req, res) => {
  try {
    const newService = new Service(req.body);
    await newService.save();
    res.status(201).json(newService);
  } catch (error) {
    res.status(500).json({ message: 'Fehler beim Erstellen' });
  }
});

// Service bearbeiten (nur Admin)
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const service = await Service.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(service);
  } catch (error) {
    res.status(500).json({ message: 'Fehler beim Bearbeiten' });
  }
});

// Service löschen (nur Admin)
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    await Service.findByIdAndDelete(req.params.id);
    res.json({ message: 'Service gelöscht' });
  } catch (error) {
    res.status(500).json({ message: 'Fehler beim Löschen' });
  }
});

module.exports = router;