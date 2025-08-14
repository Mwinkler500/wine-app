const express = require('express');
const multer = require('multer');
const Wine = require('../models/Wine');
// Optional: if you use Cloudinary later
// const { uploadImageToCloudinary } = require('../utils/cloudinary');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

/**
 * GET /api/wines
 * Return a list of wines (empty array if none).
 */
router.get('/wines', async (req, res) => {
  try {
    const wines = await Wine.find().sort({ createdAt: -1 }).limit(100);
    res.json(wines);
  } catch (err) {
    console.error('GET /wines error:', err);
    res.status(500).json({ error: 'Failed to fetch wines' });
  }
});

/**
 * GET /api/userWines
 * Return wines for the current user (uses a demo id if you don’t have auth yet).
 */
router.get('/userWines', async (req, res) => {
  try {
    const userId = (req.user && req.user.id) || 'demoUser';
    const wines = await Wine.find({ userId }).sort({ createdAt: -1 });
    res.json(wines);
  } catch (err) {
    console.error('GET /userWines error:', err);
    res.status(500).json({ error: 'Failed to fetch user wines' });
  }
});

/**
 * POST /api/wines
 * Create a wine (name is required). Adds demo userId if you don’t have auth yet.
 * Body: { name, region, notes }
 */
router.post('/wines', async (req, res) => {
  try {
    const { name, region, notes } = req.body;
    if (!name) return res.status(400).json({ error: 'name is required' });

    const userId = (req.user && req.user.id) || 'demoUser';
    const wine = new Wine({ name, region, notes, userId });
    await wine.save();

    res.status(201).json(wine);
  } catch (err) {
    console.error('POST /wines error:', err);
    res.status(500).json({ error: 'Failed to create wine' });
  }
});

/**
 * POST /api/upload
 * Simple file upload placeholder (returns filename). Swap in Cloudinary later.
 * Form-data: file=<file>
 */
router.post('/upload', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'file is required' });

    // Example if you wire up Cloudinary later:
    // const url = await uploadImageToCloudinary(req.file.path);
    // return res.json({ ok: true, url });

    res.json({ ok: true, filename: req.file.originalname });
  } catch (err) {
    console.error('POST /upload error:', err);
    res.status(500).json({ error: 'Upload failed' });
  }
});

module.exports = router;
