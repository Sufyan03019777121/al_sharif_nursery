const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const path = require('path');
const fs = require('fs');

// ✅ Load environment variables
require('dotenv').config(); // Always load from .env

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// ✅ MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch((err) => console.log('❌ MongoDB connection error:', err));

// ✅ Product Schema & Model
const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  images: [String],
});
const Product = mongoose.model('Product', productSchema);

// ✅ Admin Schema & Model
const adminSchema = new mongoose.Schema({
  password: { type: String, required: true }
});
const Admin = mongoose.model('Admin', adminSchema);

// ✅ JWT Middleware
const authenticateJWT = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.sendStatus(403);

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// ✅ Admin login route
app.post('/api/auth/login', async (req, res) => {
  const { password } = req.body;
  try {
    const admin = await Admin.findOne({});
    if (admin && bcrypt.compareSync(password, admin.password)) {
      const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      return res.json({ token });
    }
    res.status(400).json({ message: 'Incorrect password' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// ✅ Public - Get all products
app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching products' });
  }
});

// ✅ Protected - Create product
app.post('/api/products', authenticateJWT, async (req, res) => {
  const { title, description, price, images } = req.body;
  const newProduct = new Product({ title, description, price, images });

  try {
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(500).json({ message: 'Error creating product' });
  }
});

// ✅ Protected - Update product
app.put('/api/products/:id', authenticateJWT, async (req, res) => {
  const { title, description, price, images } = req.body;

  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { title, description, price, images },
      { new: true }
    );
    res.json(updatedProduct);
  } catch (err) {
    res.status(500).json({ message: 'Error updating product' });
  }
});

// ✅ Protected - Delete product
app.delete('/api/products/:id', authenticateJWT, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: 'Error deleting product' });
  }
});

// ✅ Initialize Admin Password
const initAdminPassword = async () => {
  try {
    const existingAdmin = await Admin.findOne({});
    if (!existingAdmin) {
      const hashedPassword = bcrypt.hashSync('admin123', 10);
      const admin = new Admin({ password: hashedPassword });
      await admin.save();
      console.log('✅ Admin password initialized (default: admin123)');
    }
  } catch (err) {
    console.log('❌ Error initializing admin password:', err);
  }
};

// ✅ Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  initAdminPassword();
});
