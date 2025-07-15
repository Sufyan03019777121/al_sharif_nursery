import mongoose from 'mongoose';

const rateSchema = new mongoose.Schema({
  city: String,
  gold_24k: String,
  gold_22k: String,
  silver: String,
  dollar: String
});

export default mongoose.model('Rate', rateSchema);
