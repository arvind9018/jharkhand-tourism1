// backend/src/models/Tour.model.js
import mongoose from 'mongoose';

const tourSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  duration: { type: String, required: true },
  price: { type: Number, required: true },
  maxGroupSize: { type: Number, required: true },
  locations: [String],
  startTime: String,
  endTime: String,
  included: [String],
  excluded: [String],
  guide: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  images: [String],
  rating: { average: { type: Number, default: 0 }, count: { type: Number, default: 0 } },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Tour', tourSchema);