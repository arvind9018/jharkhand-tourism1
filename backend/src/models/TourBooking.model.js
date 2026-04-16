// backend/src/models/TourBooking.model.js
import mongoose from 'mongoose';

const tourBookingSchema = new mongoose.Schema({
  bookingId: { type: String, unique: true },
  tourId: { type: mongoose.Schema.Types.ObjectId, ref: 'Tour', required: true },
  tourName: String,
  customer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  customerName: String,
  customerEmail: String,
  customerPhone: String,
  tourDate: { type: Date, required: true },
  numberOfPeople: { type: Number, required: true, min: 1 },
  totalAmount: { type: Number, required: true },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'completed', 'cancelled'],
    default: 'pending'
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'refunded'],
    default: 'pending'
  },
  paymentId: String,
  specialRequests: String,
  createdAt: { type: Date, default: Date.now }
});

tourBookingSchema.pre('save', async function(next) {
  if (!this.bookingId) {
    this.bookingId = 'TB' + Date.now() + Math.floor(Math.random() * 1000);
  }
  next();
});

const TourBooking = mongoose.model('TourBooking', tourBookingSchema);
export default TourBooking;