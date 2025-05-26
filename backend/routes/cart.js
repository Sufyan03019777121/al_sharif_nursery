const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');
const Product = require('../models/Product');

// Add item to cart (or increment quantity)
router.post('/add', async (req, res) => {
  const { phoneNumber, productId } = req.body;

  try {
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    let cart = await Cart.findOne({ phoneNumber });

    if (!cart) {
      cart = new Cart({
        phoneNumber,
        items: [{
          productId,
          title: product.title,
          price: product.price,
          quantity: 1,
        }],
      });
    } else {
      const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);
      if (itemIndex > -1) {
        cart.items[itemIndex].quantity += 1;
      } else {
        cart.items.push({
          productId,
          title: product.title,
          price: product.price,
          quantity: 1,
        });
      }
    }

    await cart.save();
    res.json(cart);
  } catch (error) {
    console.error('Error adding to cart:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get cart by phone number
router.get('/:phoneNumber', async (req, res) => {
  const phoneNumber = req.params.phoneNumber;
  try {
    const cart = await Cart.findOne({ phoneNumber });
    if (!cart) return res.json({ items: [] });
    res.json(cart);
  } catch (error) {
    console.error('Error fetching cart:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Add or update entire cart items (replace all items)
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

// Remove a specific item from cart
router.delete('/remove/:phoneNumber/:productId', async (req, res) => {
  const { phoneNumber, productId } = req.params;

  try {
    const cart = await Cart.findOne({ phoneNumber });

    if (!cart) return res.status(404).json({ message: 'Cart not found' });

    cart.items = cart.items.filter(item => item.productId.toString() !== productId);

    await cart.save();
    res.json({ message: 'Item removed from cart', cart });
  } catch (error) {
    console.error('Error removing item from cart:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Clear entire cart for a phone number
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
