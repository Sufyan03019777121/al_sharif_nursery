const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');

router.post('/', async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'تمام فیلڈز ضروری ہیں۔' });
  }

  try {
    const newContact = new Contact({ name, email, message });
    await newContact.save();

    res.status(200).json({ message: 'آپ کا پیغام کامیابی سے محفوظ ہو گیا ہے۔' });
  } catch (error) {
    console.error('Error saving contact:', error);
    res.status(500).json({ error: 'سرور کی خرابی، بعد میں کوشش کریں۔' });
  }
});

module.exports = router;
