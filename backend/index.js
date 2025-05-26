const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Route imports
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const phoneRoutes = require('./routes/phoneRoutes');
const contactRoutes = require('./routes/contactRoutes');
const cartRoutes = require('./routes/cartRoutes');
const ordersRoute = require('./routes/orders'); // ✅ orders route بھی شامل

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', authRoutes); // e.g. /api/register, /api/login, /api/users
app.use('/api/products', productRoutes);
app.use('/api/phoneNumbers', phoneRoutes);
app.use('/api/contacts', contactRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', ordersRoute); // ✅ ضروری

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
