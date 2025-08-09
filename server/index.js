require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const winesRoutes = require('./routes/wines');

const app = express();

// Middleware to parse JSON
app.use(express.json());

// Routes
app.use('/api', winesRoutes);

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
app.get('/', (req, res) => res.send('OK'));
app.get('/api/health', (req, res) => res.json({ ok: true }));
