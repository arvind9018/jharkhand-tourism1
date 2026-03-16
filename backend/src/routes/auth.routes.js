// backend/src/routes/auth.routes.js
import express from 'express';
import { signup, login, getMe } from '../controllers/auth.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const router = express.Router();

// Public routes
router.post('/signup', signup);
router.post('/login', login);

// Protected route
router.get('/me', protect, getMe);

export default router;