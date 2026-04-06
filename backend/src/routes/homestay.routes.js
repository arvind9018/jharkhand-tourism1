// backend/routes/homestay.routes.js
import express from 'express';
import {
  getAllHomestays,
  getHomestayById
} from '../controllers/homestay.controller.js';

const router = express.Router();

router.get('/', getAllHomestays);
router.get('/:id', getHomestayById);

export default router;