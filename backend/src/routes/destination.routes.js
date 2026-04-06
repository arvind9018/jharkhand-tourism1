// backend/routes/destination.routes.js
import express from 'express';
import {
  getAllDestinations,
  getDestinationById,
  getFeaturedDestinations,
  getCategories,
  getDistricts
} from '../controllers/destination.controller.js';

const router = express.Router();

router.get('/', getAllDestinations);
router.get('/featured', getFeaturedDestinations);
router.get('/categories', getCategories);
router.get('/districts', getDistricts);
router.get('/:id', getDestinationById);

export default router;