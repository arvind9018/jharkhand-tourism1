// backend/src/models/Wishlist.model.js
import mongoose from 'mongoose';

const wishlistSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  destinations: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Destination' }],
  homestays: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Homestay' }],
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
  updatedAt: { type: Date, default: Date.now }
});

const Wishlist = mongoose.model('Wishlist', wishlistSchema);
export default Wishlist;