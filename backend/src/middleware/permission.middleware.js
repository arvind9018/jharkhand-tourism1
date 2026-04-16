// backend/src/middleware/permission.middleware.js
import mongoose from 'mongoose';

// ==================== ROLE PERMISSIONS MAPPING ====================

const rolePermissions = {
  // Admin - Full access to everything
  admin: {
    permissions: ['*'], // Wildcard means all permissions
    resources: ['users', 'destinations', 'homestays', 'products', 'bookings', 'reviews', 'tours', 'artisans', 'vendors', 'guides']
  },
  
  // Artisan - Can manage their own products
  artisan: {
    permissions: [
      'create_product',
      'edit_product', 
      'delete_product',
      'view_products',
      'view_orders',
      'update_order_status'
    ],
    resources: ['products', 'orders']
  },
  
  // Homestay Owner - Can manage their own homestays
  homestay_owner: {
    permissions: [
      'create_homestay',
      'edit_homestay',
      'delete_homestay',
      'view_homestays',
      'view_bookings',
      'update_booking_status'
    ],
    resources: ['homestays', 'bookings']
  },
  
  // Guide - Can manage their tours
  guide: {
    permissions: [
      'create_tour',
      'edit_tour',
      'delete_tour',
      'view_tours',
      'view_tour_bookings'
    ],
    resources: ['tours', 'tour_bookings']
  },
  
  // Vendor - Can manage their shop
  vendor: {
    permissions: [
      'create_shop',
      'edit_shop',
      'add_product',
      'edit_product',
      'view_inventory',
      'manage_orders'
    ],
    resources: ['shop', 'products', 'inventory', 'orders']
  },
  
  // Regular User - Basic access
  user: {
    permissions: [
      'view_destinations',
      'view_homestays',
      'book_homestays',
      'write_reviews',
      'view_profile',
      'edit_profile'
    ],
    resources: ['profile', 'bookings', 'reviews']
  }
};

// ==================== MIDDLEWARE FUNCTIONS ====================

/**
 * Check if user has specific permission
 * @param {string} permission - Permission name to check
 * @returns {Function} Express middleware
 */
export const hasPermission = (permission) => {
  return (req, res, next) => {
    try {
      const userRole = req.user?.role || 'user';
      const permissions = rolePermissions[userRole]?.permissions || [];
      
      // Admin has wildcard permission
      if (permissions.includes('*') || permissions.includes(permission)) {
        next();
      } else {
        res.status(403).json({
          success: false,
          message: `Access denied. '${permission}' permission required.`,
          requiredPermission: permission,
          userRole: userRole
        });
      }
    } catch (error) {
      console.error('Permission check error:', error);
      res.status(500).json({
        success: false,
        message: 'Error checking permissions'
      });
    }
  };
};

/**
 * Check if user has any of the listed permissions
 * @param {string[]} permissions - Array of permission names
 * @returns {Function} Express middleware
 */
export const hasAnyPermission = (permissions) => {
  return (req, res, next) => {
    try {
      const userRole = req.user?.role || 'user';
      const userPermissions = rolePermissions[userRole]?.permissions || [];
      
      if (userPermissions.includes('*')) {
        return next();
      }
      
      const hasAccess = permissions.some(p => userPermissions.includes(p));
      
      if (hasAccess) {
        next();
      } else {
        res.status(403).json({
          success: false,
          message: `Access denied. Requires one of: ${permissions.join(', ')}`
        });
      }
    } catch (error) {
      console.error('Permission check error:', error);
      res.status(500).json({ success: false, message: 'Error checking permissions' });
    }
  };
};

/**
 * Check if user can manage specific resource type
 * @param {string} resource - Resource type (e.g., 'products', 'homestays')
 * @returns {Function} Express middleware
 */
export const canManage = (resource) => {
  return (req, res, next) => {
    try {
      const userRole = req.user?.role || 'user';
      const canManage = rolePermissions[userRole]?.resources || [];
      
      if (canManage.includes(resource) || canManage.includes('*')) {
        next();
      } else {
        res.status(403).json({
          success: false,
          message: `Access denied. You cannot manage ${resource}.`
        });
      }
    } catch (error) {
      console.error('Resource check error:', error);
      res.status(500).json({ success: false, message: 'Error checking access' });
    }
  };
};

/**
 * Check if user owns the resource (for editing/deleting their own items)
 * @param {string} modelName - Model name (e.g., 'Product', 'Homestay')
 * @param {string} ownerField - Field name that stores owner ID (default: 'owner')
 * @returns {Function} Express middleware
 */
export const isOwner = (modelName, ownerField = 'owner') => {
  return async (req, res, next) => {
    try {
      const resourceId = req.params.id;
      const userId = req.user._id;
      const userRole = req.user.role;
      
      // Admin can access anything
      if (userRole === 'admin') {
        return next();
      }
      
      // Dynamically import the model
      const modelPath = `../models/${modelName}.model.js`;
      const { default: Model } = await import(modelPath);
      
      const resource = await Model.findById(resourceId);
      
      if (!resource) {
        return res.status(404).json({
          success: false,
          message: 'Resource not found'
        });
      }
      
      // Check ownership based on model type
      let isResourceOwner = false;
      
      if (modelName === 'Product') {
        isResourceOwner = resource.artisan?.toString() === userId.toString();
      } else if (modelName === 'Homestay') {
        isResourceOwner = resource.owner?.toString() === userId.toString();
      } else if (modelName === 'Tour') {
        isResourceOwner = resource.guide?.toString() === userId.toString();
      } else if (modelName === 'Shop') {
        isResourceOwner = resource.vendor?.toString() === userId.toString();
      } else {
        isResourceOwner = resource[ownerField]?.toString() === userId.toString();
      }
      
      if (isResourceOwner) {
        next();
      } else {
        res.status(403).json({
          success: false,
          message: 'Access denied. You do not own this resource.'
        });
      }
    } catch (error) {
      console.error('Owner check error:', error);
      res.status(500).json({
        success: false,
        message: 'Error checking resource ownership'
      });
    }
  };
};

/**
 * Restrict access to specific roles only
 * @param {string[]} allowedRoles - Array of allowed role names
 * @returns {Function} Express middleware
 */
export const restrictTo = (allowedRoles) => {
  return (req, res, next) => {
    try {
      const userRole = req.user?.role;
      
      if (!userRole) {
        return res.status(401).json({
          success: false,
          message: 'Authentication required'
        });
      }
      
      if (allowedRoles.includes(userRole)) {
        next();
      } else {
        res.status(403).json({
          success: false,
          message: `Access denied. Allowed roles: ${allowedRoles.join(', ')}`
        });
      }
    } catch (error) {
      console.error('Role restriction error:', error);
      res.status(500).json({ success: false, message: 'Error checking role' });
    }
  };
};

/**
 * Get current user's permissions (for frontend)
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
export const getUserPermissions = (req, res) => {
  try {
    const userRole = req.user?.role || 'user';
    const permissions = rolePermissions[userRole]?.permissions || [];
    const resources = rolePermissions[userRole]?.resources || [];
    
    res.json({
      success: true,
      data: {
        role: userRole,
        permissions: permissions,
        canManage: resources,
        isAdmin: userRole === 'admin',
        isArtisan: userRole === 'artisan',
        isHomestayOwner: userRole === 'homestay_owner',
        isGuide: userRole === 'guide',
        isVendor: userRole === 'vendor',
        isUser: userRole === 'user'
      }
    });
  } catch (error) {
    console.error('Get permissions error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching permissions'
    });
  }
};

// ==================== HELPER FUNCTIONS ====================

/**
 * Check if user can perform action (for use in controllers)
 * @param {Object} user - User object
 * @param {string} permission - Permission to check
 * @returns {boolean}
 */
export const userHasPermission = (user, permission) => {
  const userRole = user?.role || 'user';
  const permissions = rolePermissions[userRole]?.permissions || [];
  return permissions.includes('*') || permissions.includes(permission);
};

/**
 * Get all permissions for a role (for frontend)
 * @param {string} role - Role name
 * @returns {Object} Permissions object
 */
export const getRolePermissions = (role) => {
  return rolePermissions[role] || rolePermissions.user;
};

// ==================== EXPORTS ====================
export default {
  hasPermission,
  hasAnyPermission,
  canManage,
  isOwner,
  restrictTo,
  getUserPermissions,
  userHasPermission,
  getRolePermissions
};