// backend/src/routes/property.routes.js
import express from 'express';
import { authenticate } from '../middleware/auth.middleware.js';
import { getMyProperties, createProperty, updateProperty, deleteProperty, getPropertyBookings } from '../controllers/property.controller.js';
import { hasPermission, isOwner } from '../middleware/permission.middleware.js';

const router = express.Router();

router.use(authenticate);
router.use(hasPermission('create_homestay'));

router.get('/', getMyProperties);
router.post('/', createProperty);
router.put('/:id', isOwner('Property', 'owner'), updateProperty);
router.delete('/:id', isOwner('Property', 'owner'), deleteProperty);
router.get('/bookings', getPropertyBookings);

export default router;