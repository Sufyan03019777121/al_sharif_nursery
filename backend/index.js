const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const phoneRoutes = require('./routes/phoneRoutes');
const contactRoutes = require('./routes/contactRoutes');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5001;

connectDB();

// Define allowed origins (add all your frontend URLs)
const allowedOrigins = [
  'http://localhost:3000',
  'https://al-sharif-nursery-frontend.onrender.com',
  'https://alsharifnursery.onrender.com' // ← add your actual deployed frontend URL here
];

// CORS middleware setup
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('CORS policy: This origin is not allowed'));
    }
  },
  credentials: true // ← enable this if you're using cookies or sessions in the future
}));

app.use(express.json());

// Routes
app.use('/api', authRoutes); // /api/register, /api/login, /api/users
app.use('/api/products', productRoutes);
app.use('/api/phoneNumbers', phoneRoutes);
app.use('/api/contact', contactRoutes);

// Start server
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
