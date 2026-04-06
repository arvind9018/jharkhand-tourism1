// backend/controllers/homestay.controller.js
import Homestay from '../models/Homestay.model.js';

// Get all homestays
export const getAllHomestays = async (req, res) => {
  try {
    const { search, priceRange, guests, page = 1, limit = 9 } = req.query;
    
    const filter = { isActive: true, isAvailable: true };
    
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { village: { $regex: search, $options: 'i' } },
        { district: { $regex: search, $options: 'i' } }
      ];
    }
    
    if (priceRange) {
      if (priceRange === 'Below ₹1000') filter.price = { $lt: 1000 };
      else if (priceRange === '₹1000 - ₹2000') filter.price = { $gte: 1000, $lte: 2000 };
      else if (priceRange === '₹2000 - ₹3000') filter.price = { $gte: 2000, $lte: 3000 };
      else if (priceRange === 'Above ₹3000') filter.price = { $gt: 3000 };
    }
    
    if (guests) {
      filter.capacity = { $gte: parseInt(guests) };
    }
    
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    const homestays = await Homestay.find(filter)
      .sort({ 'rating.average': -1 })
      .skip(skip)
      .limit(parseInt(limit));
    
    const total = await Homestay.countDocuments(filter);
    
    res.json({
      success: true,
      data: homestays,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / parseInt(limit))
      }
    });
  } catch (error) {
    console.error('Error fetching homestays:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Get homestay by ID
export const getHomestayById = async (req, res) => {
  try {
    const { id } = req.params;
    const homestay = await Homestay.findById(id).populate('owner', 'name email phone');
    
    if (!homestay) {
      return res.status(404).json({ success: false, message: 'Homestay not found' });
    }
    
    res.json({ success: true, data: homestay });
  } catch (error) {
    console.error('Error fetching homestay:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};