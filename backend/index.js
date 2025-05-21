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

// Define allowed origins (add your frontend URL here)
const allowedOrigins = [
  'http://localhost:3000',                 // local React dev server
  'https://al-sharif-nursery-frontend.onrender.com'  // your deployed frontend (replace with actual URL)
];

// Use CORS middleware with origin check
app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin (like Postman or server-to-server requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('CORS policy: This origin is not allowed'));
    }
  }
}));

app.use(express.json());

app.use('/api', authRoutes); // /api/register, /api/login, /api/users
app.use('/api/products', productRoutes);
app.use('/api/phoneNumbers', phoneRoutes);
app.use('/api/contact', contactRoutes);

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
