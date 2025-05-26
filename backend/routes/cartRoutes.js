const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');
const Product = require('../models/Product');

// Add item to cart
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
        }]
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
          quantity: 1
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

// Get cart by phoneNumber
router.get('/:phoneNumber', async (req, res) => {
  const phoneNumber = req.params.phoneNumber;
  try {
    const cart = await Cart.findOne({ phoneNumber });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }
    res.json(cart);
  } catch (error) {
    console.error('Error fetching cart:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Remove item from cart
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

// Clear cart for given phoneNumber
router.delete('/clear/:phoneNumber', async (req, res) => {
  try {
    const phone = req.params.phoneNumber;
    await Cart.deleteOne({ phoneNumber: phone });
    res.json({ message: 'Cart cleared successfully' });
  } catch (err) {
    console.error('Error clearing cart:', err);
    res.status(500).json({ message: 'Failed to clear cart' });
  }
});

module.exports = router;
