// backend/src/routes/admin.routes.js
import express from 'express';
import { authenticate, restrictTo } from '../middleware/auth.middleware.js';
import {
  getAllUsers,
  updateUserRole,
  updateUserStatus,
  deleteUser,
  getUserStatistics
} from '../controllers/admin.controller.js';

const router = express.Router();

// All routes require authentication and admin role
router.use(authenticate);
router.use(restrictTo('admin'));

// User management routes
router.get('/users', getAllUsers);
router.get('/users/statistics', getUserStatistics);
router.put('/users/:id/role', updateUserRole);
router.put('/users/:id/status', updateUserStatus);
router.delete('/users/:id', deleteUser);

export default router;