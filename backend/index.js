const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5001;

// ✅ MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch((err) => console.log('❌ MongoDB connection error:', err));

// ✅ PhoneNumber Schema & Model
const phoneNumberSchema = new mongoose.Schema({
  phoneNumber: { type: String, required: true },
  additionalData: { type: String },
}, { timestamps: true });

const PhoneNumber = mongoose.model('PhoneNumber', phoneNumberSchema);

// ✅ Product Schema & Model
const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  images: [String],
});

const Product = mongoose.model('Product', productSchema);

// ✅ Products Routes

// Get all products
app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching products' });
  }
});

// Get single product by ID
app.get('/api/products/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching product' });
  }
});

// Create product
app.post('/api/products', async (req, res) => {
  const { title, description, price, images } = req.body;
  const newProduct = new Product({ title, description, price, images });

  try {
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(500).json({ message: 'Error creating product' });
  }
});

// Update product
app.put('/api/products/:id', async (req, res) => {
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

// Delete product
app.delete('/api/products/:id', async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: 'Error deleting product' });
  }
});

// ✅ PhoneNumbers Routes

// GET - All phone numbers
app.get('/api/phoneNumbers', async (req, res) => {
  try {
    const phoneNumbers = await PhoneNumber.find();
    res.status(200).json(phoneNumbers);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching phone numbers', error });
  }
});

// GET - Single phone number by ID
app.get('/api/phoneNumbers/:id', async (req, res) => {
  try {
    const phoneNumber = await PhoneNumber.findById(req.params.id);
    if (!phoneNumber) {
      return res.status(404).json({ message: 'Phone number not found' });
    }
    res.status(200).json(phoneNumber);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching phone number', error });
  }
});

// POST - Add phone number
app.post('/api/phoneNumbers', async (req, res) => {
  const { phoneNumber } = req.body;

  const count = await PhoneNumber.countDocuments();
  if (count >= 110) {
    return res.status(400).json({ message: 'Cannot add more numbers, please delete an existing one.' });
  }

  try {
    const newPhoneNumber = new PhoneNumber({ phoneNumber });
    await newPhoneNumber.save();
    res.status(201).json(newPhoneNumber);
  } catch (error) {
    res.status(500).json({ message: 'Error saving phone number', error });
  }
});

// PUT - Update phone number
app.put('/api/phoneNumbers/:id', async (req, res) => {
  const { phoneNumber, additionalData } = req.body;

  try {
    const updatedPhoneNumber = await PhoneNumber.findByIdAndUpdate(
      req.params.id,
      { phoneNumber, additionalData },
      { new: true }
    );
    res.status(200).json(updatedPhoneNumber);
  } catch (error) {
    res.status(500).json({ message: 'Error updating phone number', error });
  }
});

// DELETE - Delete phone number
app.delete('/api/phoneNumbers/:id', async (req, res) => {
  try {
    await PhoneNumber.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Phone number deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting phone number', error });
  }
});

// ✅ Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
