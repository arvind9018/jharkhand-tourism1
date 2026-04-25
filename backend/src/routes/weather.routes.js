// backend/routes/weather.routes.js
import express from 'express';
import { authenticate } from '../middleware/auth.middleware.js';
import { 
  getDestinationWeather,
  getAllDestinationsWeather,
  getAirQuality,
  getEnvironmentalAlerts
} from '../controllers/weather.controller.js';

const router = express.Router();

// Public routes (no authentication required)
router.get('/destination/:id', getDestinationWeather);
router.get('/air-quality', getAirQuality);
router.get('/alerts', getEnvironmentalAlerts);

// Protected routes (require authentication)
router.get('/all', authenticate, getAllDestinationsWeather);

export default router;