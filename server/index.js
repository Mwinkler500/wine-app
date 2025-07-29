require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const winesRoutes = require('./routes/wines');

const app = express();
app.use(express.json());

// Route middleware
app.use('/api', winesRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  // Start server on the port Render provides, or fallback to 5000 locally
  app.listen(process.env.PORT || 5000, () =>
    console.log(`Server running on port ${process.env.PORT || 5000}`)
  );
})
.catch(err => console.error(err));
