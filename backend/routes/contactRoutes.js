// routes/contactRoutes.js
const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');

router.post('/', async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ success: false, message: 'All fields are required' });
  }

  try {
    const newContact = new Contact({ name, email, message });
    await newContact.save();

    res.status(201).json({ success: true, message: 'Message saved successfully!' });
  } catch (error) {
    console.error('❌ Error saving contact:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;
