// routes/orders.js
const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

// ✅ POST: Create a new order
router.post('/', async (req, res) => {
  const { phoneNumber, name, address, items, totalAmount, orderDate } = req.body;

  if (!phoneNumber || !name || !address || !items?.length) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const newOrder = new Order({
      phoneNumber,
      name,
      address,
      items,
      totalAmount,
      orderDate,
    });

    await newOrder.save();
    res.status(201).json({ message: 'Order placed successfully' });

  } catch (error) {
    console.error("Order error:", error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// ✅ GET: Get all orders
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find().sort({ orderDate: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

// ✅ DELETE: Delete an order by ID
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Order.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.json({ message: 'Order deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete order' });
  }
});

module.exports = router;
