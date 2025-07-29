require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const winesRoutes = require('./routes/wines');
const app = express();
require('dotenv').config();

app.use(express.json());
app.use('/api', winesRoutes);

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
app.listen(process.env.PORT || 5000, () =>
  console.log(`Server running on port ${process.env.PORT || 5000}`)
);

  .catch(err => console.error(err));
