const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');

// POST: Save or Update Cart
router.post('/', async (req, res) => {
  const { phoneNumber, items } = req.body;

  try {
    const existingCart = await Cart.findOne({ phoneNumber });

    if (existingCart) {
      existingCart.items = items;
      await existingCart.save();
      return res.json({ message: 'Cart updated', cart: existingCart });
    } else {
      const newCart = await Cart.create({ phoneNumber, items });
      return res.json({ message: 'Cart created', cart: newCart });
    }
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// GET: Retrieve Cart by Phone Number
router.get('/:phoneNumber', async (req, res) => {
  const { phoneNumber } = req.params;

  try {
    const cart = await Cart.findOne({ phoneNumber });
    if (!cart) return res.status(404).json({ error: 'Cart not found' });
    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
