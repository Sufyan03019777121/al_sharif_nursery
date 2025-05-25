const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
  title: String,
  price: Number,
  quantity: { type: Number, default: 1 }
});

const cartSchema = new mongoose.Schema({
  phoneNumber: { type: String, required: true, unique: true },
  items: [cartItemSchema]
});

module.exports = mongoose.model('Cart', cartSchema);
