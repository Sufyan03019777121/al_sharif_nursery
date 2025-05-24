// routes/cart.js
const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');
const Product = require('../models/Product');

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

module.exports = router;
