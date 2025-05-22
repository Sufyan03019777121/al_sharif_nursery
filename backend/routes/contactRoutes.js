const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');

// POST - Create New Contact
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

// GET - Get All Contacts (Admin)
router.get('/', async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (err) {
    console.error('❌ Error fetching contacts:', err);
    res.status(500).json({ success: false, message: 'Failed to fetch contacts' });
  }
});

// DELETE - Delete Contact by ID (Admin)
router.delete('/:id', async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Contact deleted successfully' });
  } catch (err) {
    console.error('❌ Error deleting contact:', err);
    res.status(500).json({ success: false, message: 'Delete failed' });
  }
});

module.exports = router;
