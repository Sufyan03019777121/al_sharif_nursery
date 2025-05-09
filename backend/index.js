const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// ===== MongoDB Connection =====
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('MongoDB connected');
  app.listen(5000, () => console.log('Server running on http://localhost:5000'));
}).catch((err) => console.error('MongoDB connection error:', err));

// ===== User Schema & Model =====
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

// ===== Product Schema & Model =====
const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  images: [String], // Multiple image URLs
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);

// ===== Routes =====

// --- Auth Routes ---
app.post('/api/auth/register', async (req, res) => {
  const { name, email, password } = req.body;
  const exist = await User.findOne({ email });
  if (exist) return res.status(400).json({ message: 'Email already exists' });

  const hashed = await bcrypt.hash(password, 10);
  const user = new User({ name, email, password: hashed });
  await user.save();
  res.status(201).json({ message: 'User registered successfully' });
});

app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ message: 'User not found' });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(401).json({ message: 'Invalid credentials' });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

  res.json({
    token,
    user: { id: user._id, name: user.name, email: user.email }
  });
});

// Password change route
app.post('/api/auth/change-password', async (req, res) => {
  const { userId, currentPassword, newPassword } = req.body;

  const user = await User.findById(userId);
  if (!user) return res.status(404).json({ message: 'User not found' });

  const isMatch = await bcrypt.compare(currentPassword, user.password);
  if (!isMatch) return res.status(400).json({ message: 'Current password is incorrect' });

  const hashedPassword = await bcrypt.hash(newPassword, 10);
  user.password = hashedPassword;
  await user.save();

  res.status(200).json({ message: 'Password changed successfully' });
});

// --- Product Routes ---

// ➕ Add product
app.post('/api/products', async (req, res) => {
  const { title, description, price, images } = req.body;
  const newProduct = new Product({ title, description, price, images });
  await newProduct.save();
  res.status(201).json({ message: 'Product added', product: newProduct });
});

// 📥 Get all products
app.get('/api/products', async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// 📥 Get single product by ID ✅ (ADDED THIS!)
app.get('/api/products/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// ✏️ Update product
app.put('/api/products/:id', async (req, res) => {
  const { id } = req.params;
  const updated = await Product.findByIdAndUpdate(id, req.body, { new: true });
  res.json({ message: 'Product updated', product: updated });
});

// ❌ Delete product
app.delete('/api/products/:id', async (req, res) => {
  const { id } = req.params;
  await Product.findByIdAndDelete(id);
  res.json({ message: 'Product deleted' });
});

// Default Route
app.get('/', (req, res) => {
  res.send('API is running...');
});
