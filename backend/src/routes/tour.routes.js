// backend/src/routes/tour.routes.js
import express from 'express';
import { authenticate } from '../middleware/auth.middleware.js';
import { getMyTours, createTour, updateTour, deleteTour, getTourBookings } from '../controllers/tour.controller.js';
import { hasPermission, isOwner } from '../middleware/permission.middleware.js';

const router = express.Router();

router.use(authenticate);
router.use(hasPermission('create_tour'));

router.get('/', getMyTours);
router.post('/', createTour);
router.put('/:id', isOwner('Tour', 'guide'), updateTour);
router.delete('/:id', isOwner('Tour', 'guide'), deleteTour);
router.get('/bookings', getTourBookings);

export default router;