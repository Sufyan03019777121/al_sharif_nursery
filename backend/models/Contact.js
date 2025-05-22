const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'نام ضروری ہے۔'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'ای میل ضروری ہے۔'],
      trim: true,
      lowercase: true,
    },
    message: {
      type: String,
      required: [true, 'پیغام ضروری ہے۔'],
      trim: true,
    },
  },
  {
    timestamps: true, // ✅ createdAt & updatedAt automatically
  }
);

module.exports = mongoose.model('Contact', contactSchema);
