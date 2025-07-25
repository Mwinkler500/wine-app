const express = require('express');
const router = express.Router();
const multer = require('multer');
const { uploadImageToCloudinary } = require('../utils/cloudinary');
const Wine = require('../models/Wine');

const upload = multer({ dest: 'uploads/' });

router.post('/upload', upload.single('file'), (req, res) => {
  res.send("PDF uploaded");
});

router.post('/wines', async (req, res) => {
  const { name, region, notes } = req.body;
  const wine = new Wine({ name, region, notes });
  await wine.save();
  res.status(201).json(wine);
});

router.get('/userWines', async (req, res) => {
  const userId = req.user?.id || "demoUser";
  const wines = await Wine.find({ userId });
  res.json(wines);
});

module.exports = router;