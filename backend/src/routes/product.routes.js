// backend/src/routes/product.routes.js
import express from 'express';
import { authenticate } from '../middleware/auth.middleware.js';
import { hasPermission, isOwner, restrictTo } from '../middleware/permission.middleware.js';
import {
  getAllProducts,
  getProductsByCategory,
  getProductById,
  getMyProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  updateProductStock,
  getAllProductsAdmin,
  updateProductStatus
} from '../controllers/product.controller.js';

const router = express.Router();

// ============ PUBLIC ROUTES ============
router.get('/', getAllProducts);
router.get('/category/:category', getProductsByCategory);
router.get('/:id', getProductById);

// ============ PROTECTED ROUTES ============
router.use(authenticate); // All routes below require login

// Artisan routes - Manage their own products
router.get('/my/products', hasPermission('view_products'), getMyProducts);
router.post('/', hasPermission('create_product'), createProduct);
router.put('/:id', hasPermission('edit_product'), isOwner('Product', 'artisan'), updateProduct);
router.delete('/:id', hasPermission('delete_product'), isOwner('Product', 'artisan'), deleteProduct);
router.patch('/:id/stock', hasPermission('edit_product'), isOwner('Product', 'artisan'), updateProductStock);

// Admin routes
router.get('/admin/all', restrictTo(['admin']), getAllProductsAdmin);
router.patch('/admin/:id/status', restrictTo(['admin']), updateProductStatus);

export default router;