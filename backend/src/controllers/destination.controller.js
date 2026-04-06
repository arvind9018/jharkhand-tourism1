// backend/controllers/destination.controller.js
import Destination from '../models/Destination.model.js';

// Get all destinations
export const getAllDestinations = async (req, res) => {
  try {
    const { search, category, district, page = 1, limit = 10, sortBy = 'name' } = req.query;
    
    const filter = { isActive: true };
    
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { district: { $regex: search, $options: 'i' } }
      ];
    }
    
    if (category && category !== 'All') {
      filter.category = category;
    }
    
    if (district && district !== 'All Districts') {
      filter.district = district;
    }
    
    const skip = (parseInt(page) - 1) * parseInt(limit);
    const sort = { [sortBy]: 1 };
    
    const destinations = await Destination.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(parseInt(limit));
    
    const total = await Destination.countDocuments(filter);
    
    res.json({
      success: true,
      data: destinations,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / parseInt(limit))
      }
    });
  } catch (error) {
    console.error('Error fetching destinations:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Get destination by ID
export const getDestinationById = async (req, res) => {
  try {
    const { id } = req.params;
    const destination = await Destination.findById(id);
    
    if (!destination) {
      return res.status(404).json({ success: false, message: 'Destination not found' });
    }
    
    res.json({ success: true, data: destination });
  } catch (error) {
    console.error('Error fetching destination:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Get featured destinations (top rated)
export const getFeaturedDestinations = async (req, res) => {
  try {
    const destinations = await Destination.find({ isActive: true })
      .sort({ 'rating.average': -1 })
      .limit(6);
    
    res.json({ success: true, data: destinations });
  } catch (error) {
    console.error('Error fetching featured destinations:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Get all categories
export const getCategories = async (req, res) => {
  try {
    const categories = await Destination.distinct('category');
    res.json({ success: true, data: categories });
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Get all districts
export const getDistricts = async (req, res) => {
  try {
    const districts = await Destination.distinct('district');
    res.json({ success: true, data: districts });
  } catch (error) {
    console.error('Error fetching districts:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};