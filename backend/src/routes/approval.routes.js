// backend/src/routes/approval.routes.js
import express from 'express';
import { authenticate, restrictTo } from '../middleware/auth.middleware.js';
import {
  getPendingApprovals,
  approveRequest,
  rejectRequest
} from '../controllers/approval.controller.js';

const router = express.Router();

// All routes require authentication and admin role
router.use(authenticate);
router.use(restrictTo('admin'));

router.get('/pending', getPendingApprovals);
router.post('/:id/approve', approveRequest);
router.post('/:id/reject', rejectRequest);

export default router;