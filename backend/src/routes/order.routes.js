// backend/src/routes/order.routes.js
import express from 'express';
import { authenticate } from '../middleware/auth.middleware.js';
import { createOrder, getUserOrders, getArtisanOrders, updateOrderStatus } from '../controllers/order.controller.js';
import { hasPermission } from '../middleware/permission.middleware.js';

const router = express.Router();

router.use(authenticate);

router.post('/', createOrder);
router.get('/', getUserOrders);
router.get('/artisan', hasPermission('view_orders'), getArtisanOrders);
router.put('/:id/status', updateOrderStatus);

export default router;