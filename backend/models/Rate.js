const mongoose = require('mongoose');

const rateSchema = new mongoose.Schema({
  city: String,
  gold_24k: String,
  gold_22k: String,
  silver: String,
  dollar: String
});

module.exports = mongoose.model('Rate', rateSchema);
