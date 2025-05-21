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
app.use(cors());
app.use(express.json());

app.use('/api', authRoutes); // /api/register, /api/login, /api/users
app.use('/api/products', productRoutes);
app.use('/api/phoneNumbers', phoneRoutes);
app.use('/api/contact', contactRoutes);

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
