const mongoose = require('mongoose');

const wineSchema = new mongoose.Schema({
  name: String,
  region: String,
  notes: String,
  image: String,
  pdf: String,
  shopifyLink: String,
  userId: String
});

module.exports = mongoose.model('Wine', wineSchema);