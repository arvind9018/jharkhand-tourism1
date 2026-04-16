// backend/src/controllers/tour.controller.js
import Tour from '../models/Tour.model.js';
import TourBooking from '../models/TourBooking.model.js';

// Get guide's tours
export const getMyTours = async (req, res) => {
  try {
    const tours = await Tour.find({ guide: req.user._id }).sort({ createdAt: -1 });
    res.json({ success: true, data: tours });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Create tour
export const createTour = async (req, res) => {
  try {
    const tour = new Tour({ ...req.body, guide: req.user._id });
    await tour.save();
    res.status(201).json({ success: true, data: tour });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update tour
export const updateTour = async (req, res) => {
  try {
    const { id } = req.params;
    const tour = await Tour.findOneAndUpdate(
      { _id: id, guide: req.user._id },
      req.body,
      { new: true }
    );
    if (!tour) {
      return res.status(404).json({ success: false, message: 'Tour not found' });
    }
    res.json({ success: true, data: tour });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete tour
export const deleteTour = async (req, res) => {
  try {
    const { id } = req.params;
    const tour = await Tour.findOneAndDelete({ _id: id, guide: req.user._id });
    if (!tour) {
      return res.status(404).json({ success: false, message: 'Tour not found' });
    }
    res.json({ success: true, message: 'Tour deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get tour bookings
export const getTourBookings = async (req, res) => {
  try {
    const tours = await Tour.find({ guide: req.user._id });
    const tourIds = tours.map(t => t._id);
    const bookings = await TourBooking.find({ tourId: { $in: tourIds } })
      .populate('customer', 'name email phone')
      .sort({ tourDate: -1 });
    res.json({ success: true, data: bookings });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};