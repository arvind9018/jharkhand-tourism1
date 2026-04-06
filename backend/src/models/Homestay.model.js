// backend/src/models/Homestay.model.js
import mongoose from 'mongoose';

const homestaySchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  village: { type: String, required: true },
  district: { type: String, required: true },
  price: { type: Number, required: true },
  capacity: { type: Number, required: true, min: 1, max: 20 },
  rating: {
    average: { type: Number, default: 0 },
    count: { type: Number, default: 0 }
  },
  images: [{
    url: String,
    isPrimary: { type: Boolean, default: false }
  }],
  amenities: [String],  // ✅ Array of strings
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  location: {
    coordinates: {
      lat: Number,
      lng: Number
    }
  },
  isAvailable: { type: Boolean, default: true },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

const Homestay = mongoose.model('Homestay', homestaySchema);
export default Homestay;