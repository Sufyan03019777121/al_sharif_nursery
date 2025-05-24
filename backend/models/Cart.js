const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  productId: String,
  title: String,
  price: Number,
  quantity: Number,
  image: String,
});

const cartSchema = new mongoose.Schema({
  phoneNumber: { type: String, required: true, unique: true },
  items: [itemSchema],
});

module.exports = mongoose.model('Cart', cartSchema);
