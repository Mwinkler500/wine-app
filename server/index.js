// server/index.js
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const winesRoutes = require('./routes/wines'); // <-- make sure the file is server/routes/wines.js

const app = express();

// Parse JSON bodies
app.use(express.json());

// Simple root + health endpoints (good for Render checks)
app.get('/', (req, res) => res.send('OK'));
app.get('/api/health', (req, res) => res.json({ ok: true }));

// Mount your API routes
app.use('/api', winesRoutes);

// 404 for anything else (optional)
app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

// ---- Startup (connect to Mongo, then listen) ----
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`✅ Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  });
