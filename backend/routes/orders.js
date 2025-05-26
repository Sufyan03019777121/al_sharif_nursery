// routes/orders.js
const express = require('express');
const router = express.Router();
const Order = require('../models/Order'); // یہ model ہونا چاہیے

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

module.exports = router;
