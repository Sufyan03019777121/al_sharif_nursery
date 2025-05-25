const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

// Route imports
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const phoneRoutes = require('./routes/phoneRoutes');
const contactRoutes = require('./routes/contactRoutes');
const cartRoutes = require('./routes/cartRoutes');   // main cart routes
const ordersRouter = require('./routes/orders');      // orders routes

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to DB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Test root endpoint
app.get('/', (req, res) => {
  res.send('API is running');
});

// Routes
app.use('/api', authRoutes);           // /api/register, /api/login, /api/users etc
app.use('/api/products', productRoutes);
app.use('/api/phoneNumbers', phoneRoutes);
app.use('/api/contacts', contactRoutes);
app.use('/api/cart', cartRoutes);      // Cart routes
app.use('/api/orders', ordersRouter);  // Orders routes

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
