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

// GET: تمام contact messages fetch کرنا (admin کے لیے)
router.get('/', async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 }); // تازہ ترین پہلے
    res.json(contacts);
  } catch (error) {
    console.error('Error fetching contacts:', error);
    res.status(500).json({ error: 'سرور کی خرابی، بعد میں کوشش کریں۔' });
  }
});

// DELETE: ایک contact message delete کرنا (admin کے لیے)
router.delete('/:id', async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);
    if (!contact) {
      return res.status(404).json({ error: 'پیغام نہیں ملا۔' });
    }
    res.json({ message: 'پیغام حذف کر دیا گیا ہے۔' });
  } catch (error) {
    console.error('Error deleting contact:', error);
    res.status(500).json({ error: 'سرور کی خرابی، بعد میں کوشش کریں۔' });
  }
});

module.exports = router;
