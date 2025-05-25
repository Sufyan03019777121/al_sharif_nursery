const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');

// Get cart by phone number
router.get('/:phoneNumber', async (req, res) => {
  try {
    const cart = await Cart.findOne({ phoneNumber: req.params.phoneNumber });
    if (!cart) return res.json({ items: [] });
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Add or update cart items for a phone number
router.post('/:phoneNumber', async (req, res) => {
  try {
    const { items } = req.body;
    let cart = await Cart.findOne({ phoneNumber: req.params.phoneNumber });

    if (!cart) {
      cart = new Cart({ phoneNumber: req.params.phoneNumber, items });
    } else {
      cart.items = items;
    }

    await cart.save();
    res.json(cart);
  } catch (err) {
    res.status(400).json({ message: 'Bad request' });
  }
});

// Clear cart for a phone number
router.delete('/clear/:phoneNumber', async (req, res) => {
  try {
    const cart = await Cart.findOneAndDelete({ phoneNumber: req.params.phoneNumber });
    if (!cart) return res.status(404).json({ message: 'Cart not found' });
    res.json({ message: 'Cart cleared' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
