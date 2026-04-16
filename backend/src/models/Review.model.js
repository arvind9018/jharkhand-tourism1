// backend/src/models/Review.model.js
import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  propertyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Property' },
  tourId: { type: mongoose.Schema.Types.ObjectId, ref: 'Tour' },
  customer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  customerName: String,
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String, required: true },
  images: [String],
  helpful: { type: Number, default: 0 },
  response: String,
  responseDate: Date,
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

const Review = mongoose.model('Review', reviewSchema);
export default Review;