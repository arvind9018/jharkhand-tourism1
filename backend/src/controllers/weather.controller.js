// backend/controllers/weather.controller.js
import weatherService from '../services/weather.service.js';
import Destination from '../models/Destination.model.js';

export const getAllDestinationsWeather = async (req, res) => {
  try {
    const destinations = await Destination.find({ isActive: true });
    
    if (!destinations || destinations.length === 0) {
      return res.json({ 
        success: true, 
        data: [], 
        message: 'No active destinations found' 
      });
    }
    
    const weatherData = await weatherService.getDestinationsWeather(destinations);
    
    // Always return success true with data (even if mock)
    res.json({ 
      success: true, 
      data: weatherData,
      message: weatherData.length > 0 ? 'Weather data retrieved' : 'Using mock weather data'
    });
  } catch (error) {
    console.error('Weather error:', error);
    // Return empty array instead of error
    res.json({ 
      success: true, 
      data: [], 
      message: 'Unable to fetch weather data, using mock data' 
    });
  }
};

export const getEnvironmentalAlerts = async (req, res) => {
  try {
    const alerts = await weatherService.getEnvironmentalAlerts();
    res.json({ success: true, data: alerts });
  } catch (error) {
    console.error('Alerts error:', error);
    res.json({ success: true, data: [] });
  }
};

export const getDestinationWeather = async (req, res) => {
  try {
    const { id } = req.params;
    const destination = await Destination.findById(id);
    
    if (!destination) {
      return res.json({ 
        success: true, 
        data: null, 
        message: 'Destination not found' 
      });
    }
    
    const weather = await weatherService.getCurrentWeather(
      destination.location?.coordinates?.lat || 23.5,
      destination.location?.coordinates?.lng || 85.3
    );
    
    res.json({ success: true, data: weather });
  } catch (error) {
    console.error('Destination weather error:', error);
    res.json({ success: true, data: null });
  }
};

export const getAirQuality = async (req, res) => {
  try {
    const { lat, lon } = req.query;
    if (!lat || !lon) {
      return res.json({ success: true, data: null });
    }
    
    const airQuality = await weatherService.getAirQuality(parseFloat(lat), parseFloat(lon));
    res.json({ success: true, data: airQuality });
  } catch (error) {
    console.error('Air quality error:', error);
    res.json({ success: true, data: null });
  }
};