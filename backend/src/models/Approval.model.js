// backend/src/models/Approval.model.js
import mongoose from 'mongoose';

const approvalSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  type: {
    type: String,
    enum: ['HOMESTAY', 'GUIDE', 'ARTISAN', 'VENDOR', 'PRODUCT'],
    required: true
  },
  name: {
    type: String,
    required: true
  },
  submittedBy: {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    name: String,
    email: String
  },
  details: {
    type: mongoose.Schema.Types.Mixed,
    default: {}
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },
  rejectionReason: String,
  reviewedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  reviewedAt: Date,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Approval = mongoose.model('Approval', approvalSchema);
export default Approval;