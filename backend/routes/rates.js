import express from 'express';
import Rate from '../models/Rate.js';

const router = express.Router();

// GET all rates
router.get('/', async (req, res) => {
  const rates = await Rate.find();
  res.json(rates);
});

// POST new rate
router.post('/', async (req, res) => {
  const rate = new Rate(req.body);
  await rate.save();
  res.json(rate);
});

// PUT update rate
router.put('/:id', async (req, res) => {
  const rate = await Rate.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(rate);
});

// DELETE rate
router.delete('/:id', async (req, res) => {
  await Rate.findByIdAndDelete(req.params.id);
  res.json({ message: "Rate deleted" });
});

// DELETE all rates
router.delete('/', async (req, res) => {
  await Rate.deleteMany({});
  res.json({ message: 'All rates deleted' });
});


export default router;
