// backend/src/models/Shop.model.js
import mongoose from 'mongoose';

const shopSchema = new mongoose.Schema({
  vendor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  shopName: { type: String, required: true },
  description: String,
  logo: String,
  banner: String,
  address: String,
  city: String,
  state: String,
  pincode: String,
  phone: String,
  email: String,
  gstNumber: String,
  categories: [String],
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Shop', shopSchema);