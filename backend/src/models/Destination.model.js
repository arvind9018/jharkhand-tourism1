// backend/src/models/Destination.model.js
import mongoose from 'mongoose';

const destinationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  district: { type: String, required: true },
  location: {
    address: String,
    coordinates: { lat: Number, lng: Number }
  },
  images: [{
    url: String,
    caption: String,
    isPrimary: { type: Boolean, default: false }
  }],
  rating: {
    average: { type: Number, default: 0 },
    count: { type: Number, default: 0 }
  },
  bestTimeToVisit: String,
  entryFee: {
    indian: Number,
    foreigner: Number
  },
  openingHours: String,
  facilities: [String],
  nearbyAttractions: [{
    name: { type: String, required: true },
    distance: { type: String, required: true },
    type: { type: String, required: true }
  }],  // ✅ This should be an array of objects, not strings
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

const Destination = mongoose.model('Destination', destinationSchema);
export default Destination;