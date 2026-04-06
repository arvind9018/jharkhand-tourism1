// backend/src/models/Product.model.js
import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  category: { type: String, required: true },
  artisan: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  artisanName: String,
  village: String,
  district: String,
  price: { type: Number, required: true, min: 0 },
  rating: {
    average: { type: Number, default: 0 },
    count: { type: Number, default: 0 }
  },
  images: [String],  // ✅ Array of strings
  inStock: { type: Boolean, default: true },
  quantity: { type: Number, default: 1 },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);
export default Product;