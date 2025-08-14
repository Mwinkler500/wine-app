const express = require('express');
const router = express.Router();
const Wine = require('../models/Wine');

// POST /api/wines  (create)
router.post('/wines', async (req, res) => {
  try {
    const { name, region, notes } = req.body;
    const wine = new Wine({ name, region, notes });
    await wine.save();
    res.status(201).json(wine);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to save wine' });
  }
});

// GET /api/wines  (list)
router.get('/wines', async (req, res) => {
  try {
    const wines = await Wine.find({});
    res.json(wines);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch wines' });
  }
});

module.exports = router;
