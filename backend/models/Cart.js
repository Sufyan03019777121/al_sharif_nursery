// models/Cart.js
const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  phoneNumber: { type: String, required: true },
  items: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
      title: String,
      price: Number,
      quantity: { type: Number, default: 1 },
    }
  ]
});

module.exports = mongoose.model('Cart', cartSchema);
