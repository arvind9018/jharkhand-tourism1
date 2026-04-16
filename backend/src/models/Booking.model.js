// backend/src/models/Booking.model.js
import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  bookingId: { type: String, unique: true },
  propertyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Property', required: true },
  propertyName: { type: String, required: true },
  customer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  customerName: String,
  customerEmail: String,
  customerPhone: String,
  checkIn: { type: Date, required: true },
  checkOut: { type: Date, required: true },
  numberOfGuests: { type: Number, required: true, min: 1 },
  totalAmount: { type: Number, required: true },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'checked_in', 'checked_out', 'cancelled'],
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

bookingSchema.pre('save', async function(next) {
  if (!this.bookingId) {
    this.bookingId = 'BK' + Date.now() + Math.floor(Math.random() * 1000);
  }
  next();
});

const Booking = mongoose.model('Booking', bookingSchema);
export default Booking;