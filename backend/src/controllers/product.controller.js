// backend/src/controllers/product.controller.js
import Product from '../models/Product.model.js';

// ============ PUBLIC FUNCTIONS ============

// Get all products (public)
export const getAllProducts = async (req, res) => {
  try {
    const { category, search, page = 1, limit = 9 } = req.query;
    
    const filter = { isActive: true, inStock: true };
    
    if (category && category !== 'All') {
      filter.category = category;
    }
    
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { artisanName: { $regex: search, $options: 'i' } },
        { village: { $regex: search, $options: 'i' } }
      ];
    }
    
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    const products = await Product.find(filter)
      .sort({ 'rating.average': -1 })
      .skip(skip)
      .limit(parseInt(limit));
    
    const total = await Product.countDocuments(filter);
    
    res.json({
      success: true,
      data: products,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / parseInt(limit))
      }
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Get products by category (public)
export const getProductsByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    
    const products = await Product.find({ category, isActive: true, inStock: true })
      .sort({ 'rating.average': -1 });
    
    res.json({ success: true, data: products });
  } catch (error) {
    console.error('Error fetching products by category:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Get product by ID (public)
export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id).populate('artisan', 'name email');
    
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    
    res.json({ success: true, data: product });
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// ============ ARTISAN FUNCTIONS (Protected) ============

// Get products for the logged-in artisan only
export const getMyProducts = async (req, res) => {
  try {
    const products = await Product.find({ 
      artisan: req.user._id, 
      isActive: true 
    }).sort({ createdAt: -1 });
    
    res.json({
      success: true,
      data: products,
      count: products.length
    });
  } catch (error) {
    console.error('Error fetching my products:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Create new product (for artisans)
export const createProduct = async (req, res) => {
  try {
    const productData = {
      ...req.body,
      artisan: req.user._id,
      artisanName: req.user.name,
      createdAt: Date.now(),
      updatedAt: Date.now()
    };
    
    const product = await Product.create(productData);
    
    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      data: product
    });
  } catch (error) {
    console.error('Error creating product:', error);
    
    // Handle validation errors
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ 
        success: false, 
        message: 'Validation error', 
        errors 
      });
    }
    
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Update product (artisan can only update their own products)
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    
    const product = await Product.findOneAndUpdate(
      { _id: id, artisan: req.user._id }, // Ensure artisan owns the product
      { ...req.body, updatedAt: Date.now() },
      { new: true, runValidators: true }
    );
    
    if (!product) {
      return res.status(404).json({ 
        success: false, 
        message: 'Product not found or you do not have permission to edit it' 
      });
    }
    
    res.json({
      success: true,
      message: 'Product updated successfully',
      data: product
    });
  } catch (error) {
    console.error('Error updating product:', error);
    
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ 
        success: false, 
        message: 'Validation error', 
        errors 
      });
    }
    
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Delete product (artisan can only delete their own products)
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    
    const product = await Product.findOneAndDelete({ 
      _id: id, 
      artisan: req.user._id 
    });
    
    if (!product) {
      return res.status(404).json({ 
        success: false, 
        message: 'Product not found or you do not have permission to delete it' 
      });
    }
    
    res.json({
      success: true,
      message: 'Product deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Update product stock (for artisans)
export const updateProductStock = async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity, inStock } = req.body;
    
    const product = await Product.findOneAndUpdate(
      { _id: id, artisan: req.user._id },
      { quantity, inStock, updatedAt: Date.now() },
      { new: true }
    );
    
    if (!product) {
      return res.status(404).json({ 
        success: false, 
        message: 'Product not found' 
      });
    }
    
    res.json({
      success: true,
      message: 'Stock updated successfully',
      data: product
    });
  } catch (error) {
    console.error('Error updating stock:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// ============ ADMIN FUNCTIONS ============

// Get all products (including inactive) - Admin only
export const getAllProductsAdmin = async (req, res) => {
  try {
    const products = await Product.find({})
      .sort({ createdAt: -1 })
      .populate('artisan', 'name email');
    
    res.json({
      success: true,
      data: products,
      count: products.length
    });
  } catch (error) {
    console.error('Error fetching all products:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Approve/Reject product (Admin only)
export const updateProductStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { isActive, rejectionReason } = req.body;
    
    const product = await Product.findByIdAndUpdate(
      id,
      { isActive, rejectionReason, updatedAt: Date.now() },
      { new: true }
    );
    
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    
    res.json({
      success: true,
      message: `Product ${isActive ? 'approved' : 'rejected'} successfully`,
      data: product
    });
  } catch (error) {
    console.error('Error updating product status:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};