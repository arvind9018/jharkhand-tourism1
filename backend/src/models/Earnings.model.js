// backend/src/models/Earnings.model.js
import mongoose from 'mongoose';

const earningsSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  role: { type: String, enum: ['artisan', 'guide', 'homestay_owner', 'vendor'], required: true },
  sourceId: { type: mongoose.Schema.Types.ObjectId, required: true }, // OrderId, BookingId, TourBookingId
  sourceType: { type: String, enum: ['order', 'booking', 'tour_booking'], required: true },
  amount: { type: Number, required: true },
  commission: { type: Number, default: 0 },
  netAmount: { type: Number, required: true },
  status: {
    type: String,
    enum: ['pending', 'processing', 'paid'],
    default: 'pending'
  },
  payoutDate: Date,
  payoutMethod: String,
  transactionId: String,
  createdAt: { type: Date, default: Date.now }
});

const Earnings = mongoose.model('Earnings', earningsSchema);
export default Earnings;