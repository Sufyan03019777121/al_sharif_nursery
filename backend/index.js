// // ✅ IMPORTS
// const express = require('express');
// const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');
// const cors = require('cors');
// require('dotenv').config();

// const app = express();
// const PORT = process.env.PORT || 5001;

// // ✅ MIDDLEWARE
// app.use(cors());
// app.use(express.json());

// // ✅ MongoDB Connection
// mongoose.connect(MONGO_URI)
//   .then(() => console.log("MongoDB connected"))
//   .catch(err => console.error("MongoDB connection error:", err));

// // ✅ USER SCHEMA & MODEL
// const userSchema = new mongoose.Schema({
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
// }, { timestamps: true });

// const User = mongoose.model('User', userSchema);

// // ✅ REGISTER ROUTE
// app.post('/api/register', async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     const exist = await User.findOne({ email });
//     if (exist) return res.status(400).json({ message: 'Email already registered' });

//     const hash = await bcrypt.hash(password, 10);
//     const newUser = new User({ email, password: hash });
//     await newUser.save();
//     res.status(201).json({ message: 'User registered successfully' });
//   } catch (err) {
//     res.status(500).json({ message: 'Registration failed', error: err.message });
//   }
// });

// // ✅ LOGIN ROUTE
// app.post('/api/login', async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     const user = await User.findOne({ email });
//     if (!user) return res.status(400).json({ message: 'Invalid credentials' });

//     const match = await bcrypt.compare(password, user.password);
//     if (!match) return res.status(400).json({ message: 'Invalid credentials' });

//     res.status(200).json({ message: 'Login successful', user: { email: user.email } });
//   } catch (err) {
//     res.status(500).json({ message: 'Login failed', error: err.message });
//   }
// });

// // ✅ GET ALL USERS ROUTE
// app.get('/api/users', async (req, res) => {
//   try {
//     const users = await User.find({}, 'email createdAt').sort({ createdAt: -1 });
//     res.status(200).json(users);
//   } catch (err) {
//     res.status(500).json({ message: 'Failed to fetch users', error: err.message });
//   }
// });

// // ✅ PRODUCT SCHEMA & MODEL
// const productSchema = new mongoose.Schema({
//   title: { type: String, required: true },
//   description: { type: String, required: true },
//   price: { type: Number, required: true },
//   images: [String],
// });

// const Product = mongoose.model('Product', productSchema);

// // ✅ PRODUCT ROUTES
// app.get('/api/products', async (req, res) => {
//   try {
//     const products = await Product.find();
//     res.json(products);
//   } catch (err) {
//     res.status(500).json({ message: 'Error fetching products' });
//   }
// });

// app.get('/api/products/:id', async (req, res) => {
//   try {
//     const product = await Product.findById(req.params.id);
//     if (!product) return res.status(404).json({ message: 'Product not found' });
//     res.json(product);
//   } catch (err) {
//     res.status(500).json({ message: 'Error fetching product' });
//   }
// });

// app.post('/api/products', async (req, res) => {
//   const { title, description, price, images } = req.body;
//   const newProduct = new Product({ title, description, price, images });
//   try {
//     await newProduct.save();
//     res.status(201).json(newProduct);
//   } catch (err) {
//     res.status(500).json({ message: 'Error creating product' });
//   }
// });

// app.put('/api/products/:id', async (req, res) => {
//   const { title, description, price, images } = req.body;
//   try {
//     const updatedProduct = await Product.findByIdAndUpdate(
//       req.params.id,
//       { title, description, price, images },
//       { new: true }
//     );
//     res.json(updatedProduct);
//   } catch (err) {
//     res.status(500).json({ message: 'Error updating product' });
//   }
// });

// app.delete('/api/products/:id', async (req, res) => {
//   try {
//     await Product.findByIdAndDelete(req.params.id);
//     res.status(204).send();
//   } catch (err) {
//     res.status(500).json({ message: 'Error deleting product' });
//   }
// });

// // ✅ PHONE NUMBER SCHEMA & MODEL
// const phoneNumberSchema = new mongoose.Schema({
//   phoneNumber: { type: String, required: true },
//   additionalData: { type: String },
// }, { timestamps: true });

// const PhoneNumber = mongoose.model('PhoneNumber', phoneNumberSchema);

// // ✅ PHONE NUMBER ROUTES
// app.get('/api/phoneNumbers', async (req, res) => {
//   try {
//     const phoneNumbers = await PhoneNumber.find();
//     res.status(200).json(phoneNumbers);
//   } catch (error) {
//     res.status(500).json({ message: 'Error fetching phone numbers', error });
//   }
// });

// app.get('/api/phoneNumbers/:id', async (req, res) => {
//   try {
//     const phoneNumber = await PhoneNumber.findById(req.params.id);
//     if (!phoneNumber) return res.status(404).json({ message: 'Phone number not found' });
//     res.status(200).json(phoneNumber);
//   } catch (error) {
//     res.status(500).json({ message: 'Error fetching phone number', error });
//   }
// });

// app.post('/api/phoneNumbers', async (req, res) => {
//   const { phoneNumber } = req.body;
//   const count = await PhoneNumber.countDocuments();
//   if (count >= 110) {
//     return res.status(400).json({ message: 'Cannot add more numbers, please delete an existing one.' });
//   }
//   try {
//     const newPhoneNumber = new PhoneNumber({ phoneNumber });
//     await newPhoneNumber.save();
//     res.status(201).json(newPhoneNumber);
//   } catch (error) {
//     res.status(500).json({ message: 'Error saving phone number', error });
//   }
// });

// app.put('/api/phoneNumbers/:id', async (req, res) => {
//   const { phoneNumber, additionalData } = req.body;
//   try {
//     const updatedPhoneNumber = await PhoneNumber.findByIdAndUpdate(
//       req.params.id,
//       { phoneNumber, additionalData },
//       { new: true }
//     );
//     res.status(200).json(updatedPhoneNumber);
//   } catch (error) {
//     res.status(500).json({ message: 'Error updating phone number', error });
//   }
// });

// app.delete('/api/phoneNumbers/:id', async (req, res) => {
//   try {
//     await PhoneNumber.findByIdAndDelete(req.params.id);
//     res.status(200).json({ message: 'Phone number deleted' });
//   } catch (error) {
//     res.status(500).json({ message: 'Error deleting phone number', error });
//   }
// });

// // ✅ START SERVER
// app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));


const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const phoneRoutes = require('./routes/phoneRoutes');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5001;

connectDB();
app.use(cors());
app.use(express.json());

app.use('/api', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/phoneNumbers', phoneRoutes);

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
