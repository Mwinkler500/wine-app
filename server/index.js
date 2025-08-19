require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const winesRoutes = require('./routes/wines');

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());
const cors = require('cors');

// allow local dev and (later) your Vercel domain
app.use(cors({
  origin: [
    'http://localhost:3000',
    // add your prod frontend later, e.g.:
    // 'https://wine-app-sigma.vercel.app',
  ],
}));

// Mount routes
app.use('/api', winesRoutes);

// Simple health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ ok: true });
});

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  // Start server on Render's provided port or 5000 locally
  app.listen(process.env.PORT || 5000, () => {
    console.log(`✅ Server running on port ${process.env.PORT || 5000}`);
  });
})
.catch(err => {
  console.error("❌ MongoDB connection error:", err);
});
