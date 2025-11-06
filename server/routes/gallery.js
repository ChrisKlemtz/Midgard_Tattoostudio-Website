const express = require('express');
const Image = require('../models/Image');
const { upload, cloudinary } = require('../config/cloudinary');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// Alle Bilder holen (öffentlich)
router.get('/', async (req, res) => {
  try {
    const images = await Image.find().sort({ order: 1, createdAt: -1 });
    res.json(images);
  } catch (error) {
    res.status(500).json({ message: 'Fehler beim Laden der Bilder' });
  }
});

// Bild hochladen (nur Admin)
router.post('/', authMiddleware, upload.single('image'), async (req, res) => {
  try {
    const { title, category, order } = req.body;

    const newImage = new Image({
      title,
      category,
      imageUrl: req.file.path,
      cloudinaryId: req.file.filename,
      order: order || 0
    });

    await newImage.save();
    res.status(201).json(newImage);
  } catch (error) {
    res.status(500).json({ message: 'Fehler beim Hochladen' });
  }
});

// Bild löschen (nur Admin)
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const image = await Image.findById(req.params.id);
    if (!image) {
      return res.status(404).json({ message: 'Bild nicht gefunden' });
    }

    // Aus Cloudinary löschen
    await cloudinary.uploader.destroy(image.cloudinaryId);
    
    // Aus Datenbank löschen
    await Image.findByIdAndDelete(req.params.id);
    
    res.json({ message: 'Bild gelöscht' });
  } catch (error) {
    res.status(500).json({ message: 'Fehler beim Löschen' });
  }
});

module.exports = router;