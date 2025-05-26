// models/Cart.js
import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema({
  productId: { type: String, required: true },
  title: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, default: 1 },
});

const cartSchema = new mongoose.Schema({
  phoneNumber: { type: String, required: true, unique: true },
  items: [cartItemSchema],
});

export default mongoose.model("Cart", cartSchema);
