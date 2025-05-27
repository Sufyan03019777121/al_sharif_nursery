const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  phoneNumber: { type: String, required: true },
  name: { type: String, required: true },
  address: { type: String, required: true },
  items: [
    {
      title: { type: String, required: true },
      price: { type: Number, required: true },
      quantity: { type: Number, required: true },
    },
  ],
  totalAmount: { type: Number, required: true },
  orderDate: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Order', orderSchema);
