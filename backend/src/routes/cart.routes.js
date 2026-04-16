// backend/src/routes/cart.routes.js
import express from 'express';
import { authenticate } from '../middleware/auth.middleware.js';
import { getCart, addToCart, updateCartItem, removeFromCart, clearCart } from '../controllers/cart.controller.js';

const router = express.Router();

router.use(authenticate);

router.get('/', getCart);
router.post('/add', addToCart);
router.put('/update', updateCartItem);
router.delete('/remove/:productId', removeFromCart);
router.delete('/clear', clearCart);

export default router;