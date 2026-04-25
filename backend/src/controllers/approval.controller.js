// backend/src/controllers/approval.controller.js
import Approval from '../models/Approval.model.js';
import User from '../models/User.model.js';

// Get all pending approvals
export const getPendingApprovals = async (req, res) => {
  try {
    const { type, page = 1, limit = 10 } = req.query;
    
    const filter = { status: 'pending' };
    if (type && type !== 'all') {
      filter.type = type;
    }
    
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    const approvals = await Approval.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit))
      .populate('userId', 'name email');
    
    const total = await Approval.countDocuments(filter);
    
    const formattedApprovals = approvals.map(approval => ({
      id: approval._id,
      type: approval.type,
      name: approval.name,
      submittedBy: {
        id: approval.userId?._id,
        name: approval.userId?.name || approval.submittedBy?.name,
        email: approval.userId?.email || approval.submittedBy?.email
      },
      submittedDate: approval.createdAt,
      status: approval.status,
      details: approval.details
    }));
    
    res.json({
      success: true,
      data: {
        approvals: formattedApprovals,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          pages: Math.ceil(total / parseInt(limit))
        }
      }
    });
  } catch (error) {
    console.error('Error fetching pending approvals:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Approve a request
export const approveRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const { role, notes } = req.body;
    
    const approval = await Approval.findById(id);
    if (!approval) {
      return res.status(404).json({ success: false, message: 'Approval request not found' });
    }
    
    approval.status = 'approved';
    approval.reviewedBy = req.user._id;
    approval.reviewedAt = new Date();
    await approval.save();
    
    // Update user role
    if (approval.type !== 'PRODUCT') {
      await User.findByIdAndUpdate(approval.userId, { 
        role: approval.type.toLowerCase(),
        approvalStatus: 'approved'
      });
    }
    
    res.json({
      success: true,
      message: 'Request approved successfully',
      data: approval
    });
  } catch (error) {
    console.error('Error approving request:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Reject a request
export const rejectRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const { reason } = req.body;
    
    const approval = await Approval.findById(id);
    if (!approval) {
      return res.status(404).json({ success: false, message: 'Approval request not found' });
    }
    
    approval.status = 'rejected';
    approval.rejectionReason = reason;
    approval.reviewedBy = req.user._id;
    approval.reviewedAt = new Date();
    await approval.save();
    
    await User.findByIdAndUpdate(approval.userId, { 
      approvalStatus: 'rejected',
      rejectionReason: reason
    });
    
    res.json({
      success: true,
      message: 'Request rejected',
      data: approval
    });
  } catch (error) {
    console.error('Error rejecting request:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};