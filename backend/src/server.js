// backend/src/server.js
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes.js';
import contactRoutes from './routes/contact.routes.js';
import destinationRoutes from './routes/destination.routes.js';
import homestayRoutes from './routes/homestay.routes.js';
import productRoutes from './routes/product.routes.js';

dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:5173', 'http://localhost:5174'],
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/destinations', destinationRoutes);
app.use('/api/homestays', homestayRoutes);
app.use('/api/products', productRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
    timestamp: new Date().toISOString()
  });
});

// Root route
app.get('/', (req, res) => {
  res.json({
    message: 'Jharkhand Tourism API',
    version: '1.0.0',
    endpoints: {
      auth: {
        signup: 'POST /api/auth/signup',
        login: 'POST /api/auth/login',
        me: 'GET /api/auth/me',
        profile: 'PUT /api/auth/profile'
      },
      contact: {
        send: 'POST /api/contact'
      },
      destinations: {
        getAll: 'GET /api/destinations',
        getFeatured: 'GET /api/destinations/featured',
        getById: 'GET /api/destinations/:id',
        getCategories: 'GET /api/destinations/categories',
        getDistricts: 'GET /api/destinations/districts'
      },
      homestays: {
        getAll: 'GET /api/homestays',
        getById: 'GET /api/homestays/:id'
      },
      products: {
        getAll: 'GET /api/products',
        getByCategory: 'GET /api/products/category/:category',
        getById: 'GET /api/products/:id'
      },
      health: 'GET /health'
    }
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({
    success: false,
    message: 'Internal server error'
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});