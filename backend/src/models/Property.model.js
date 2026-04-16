// backend/src/models/Property.model.js
import mongoose from 'mongoose';

const propertySchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  type: { type: String, enum: ['homestay', 'cottage', 'farmhouse'], default: 'homestay' },
  location: {
    address: String,
    city: String,
    district: String,
    state: String,
    pincode: String,
    coordinates: { lat: Number, lng: Number }
  },
  pricePerNight: { type: Number, required: true },
  capacity: { type: Number, required: true },
  bedrooms: Number,
  bathrooms: Number,
  images: [String],
  amenities: [String],
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  rating: { average: { type: Number, default: 0 }, count: { type: Number, default: 0 } },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Property', propertySchema);