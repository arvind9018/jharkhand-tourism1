// backend/src/controllers/shop.controller.js
import Shop from '../models/Shop.model.js';
import Product from '../models/Product.model.js';

// Get vendor's shop
export const getMyShop = async (req, res) => {
  try {
    let shop = await Shop.findOne({ vendor: req.user._id });
    if (!shop) {
      shop = new Shop({ vendor: req.user._id, shopName: req.user.name });
      await shop.save();
    }
    res.json({ success: true, data: shop });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update shop
export const updateShop = async (req, res) => {
  try {
    const shop = await Shop.findOneAndUpdate(
      { vendor: req.user._id },
      req.body,
      { new: true, upsert: true }
    );
    res.json({ success: true, data: shop });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get vendor inventory (their products)
export const getInventory = async (req, res) => {
  try {
    const products = await Product.find({ artisan: req.user._id }).sort({ createdAt: -1 });
    res.json({ success: true, data: products });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update inventory (product stock)
export const updateInventory = async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity, inStock } = req.body;
    const product = await Product.findOneAndUpdate(
      { _id: id, artisan: req.user._id },
      { quantity, inStock },
      { new: true }
    );
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    res.json({ success: true, data: product });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};