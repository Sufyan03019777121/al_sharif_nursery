// ✅ models/PhoneNumber.js
const mongoose = require('mongoose');

const phoneNumberSchema = new mongoose.Schema({
  phoneNumber: { type: String, required: true },
  additionalData: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('PhoneNumber', phoneNumberSchema);
