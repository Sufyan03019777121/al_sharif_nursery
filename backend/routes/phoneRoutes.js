
// ✅ routes/phoneRoutes.js
const express = require('express');
const PhoneNumber = require('../models/PhoneNumber');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const phoneNumbers = await PhoneNumber.find();
    res.status(200).json(phoneNumbers);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching phone numbers', error });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const phoneNumber = await PhoneNumber.findById(req.params.id);
    if (!phoneNumber) return res.status(404).json({ message: 'Phone number not found' });
    res.status(200).json(phoneNumber);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching phone number', error });
  }
});

router.post('/', async (req, res) => {
  const { phoneNumber } = req.body;
  const count = await PhoneNumber.countDocuments();
  if (count >= 110) {
    return res.status(400).json({ message: 'Cannot add more numbers, please delete an existing one.' });
  }
  try {
    const newPhoneNumber = new PhoneNumber({ phoneNumber });
    await newPhoneNumber.save();
    res.status(201).json(newPhoneNumber);
  } catch (error) {
    res.status(500).json({ message: 'Error saving phone number', error });
  }
});

router.put('/:id', async (req, res) => {
  const { phoneNumber, additionalData } = req.body;
  try {
    const updatedPhoneNumber = await PhoneNumber.findByIdAndUpdate(
      req.params.id,
      { phoneNumber, additionalData },
      { new: true }
    );
    res.status(200).json(updatedPhoneNumber);
  } catch (error) {
    res.status(500).json({ message: 'Error updating phone number', error });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await PhoneNumber.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Phone number deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting phone number', error });
  }
});

module.exports = router;

