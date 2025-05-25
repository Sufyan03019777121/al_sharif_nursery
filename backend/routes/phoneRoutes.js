const express = require('express');
const PhoneNumber = require('../models/PhoneNumber');
const router = express.Router();

// تمام فون نمبرز حاصل کریں
router.get('/', async (req, res) => {
  try {
    const phoneNumbers = await PhoneNumber.find();
    res.status(200).json(phoneNumbers);
  } catch (error) {
    res.status(500).json({ message: 'فون نمبرز حاصل کرنے میں مسئلہ ہے', error });
  }
});

// ایک فون نمبر حاصل کریں (ID سے)
router.get('/:id', async (req, res) => {
  try {
    const phoneNumber = await PhoneNumber.findById(req.params.id);
    if (!phoneNumber) {
      return res.status(404).json({ message: 'فون نمبر نہیں ملا' });
    }
    res.status(200).json(phoneNumber);
  } catch (error) {
    res.status(500).json({ message: 'فون نمبر حاصل کرنے میں مسئلہ ہے', error });
  }
});

// نیا فون نمبر شامل کریں
router.post('/', async (req, res) => {
  const { phoneNumber } = req.body;
  try {
    const count = await PhoneNumber.countDocuments();
    if (count >= 110) {
      return res.status(400).json({ message: 'مزید فون نمبر شامل نہیں کیے جا سکتے، پہلے سے حذف کریں۔' });
    }
    const newPhoneNumber = new PhoneNumber({ phoneNumber });
    await newPhoneNumber.save();
    res.status(201).json(newPhoneNumber);
  } catch (error) {
    res.status(500).json({ message: 'فون نمبر محفوظ کرنے میں مسئلہ ہے', error });
  }
});

// فون نمبر اپڈیٹ کریں
router.put('/:id', async (req, res) => {
  const { phoneNumber, additionalData } = req.body;
  try {
    const updated = await PhoneNumber.findByIdAndUpdate(
      req.params.id,
      { phoneNumber, additionalData },
      { new: true }
    );
    if (!updated) {
      return res.status(404).json({ message: 'فون نمبر نہیں ملا' });
    }
    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: 'فون نمبر اپڈیٹ کرنے میں مسئلہ ہے', error });
  }
});

// فون نمبر حذف کریں
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await PhoneNumber.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: 'فون نمبر نہیں ملا' });
    }
    res.status(200).json({ message: 'فون نمبر حذف کر دیا گیا ہے' });
  } catch (error) {
    res.status(500).json({ message: 'فون نمبر حذف کرنے میں مسئلہ ہے', error });
  }
});

module.exports = router;
