// backend/src/routes/shop.routes.js
import express from 'express';
import { authenticate } from '../middleware/auth.middleware.js';
import { getMyShop, updateShop, getInventory, updateInventory } from '../controllers/shop.controller.js';
import { hasPermission, isOwner } from '../middleware/permission.middleware.js';

const router = express.Router();

router.use(authenticate);
router.use(hasPermission('manage_shop'));

router.get('/', getMyShop);
router.put('/', updateShop);
router.get('/inventory', getInventory);
router.put('/inventory/:id', isOwner('Product', 'artisan'), updateInventory);

export default router;