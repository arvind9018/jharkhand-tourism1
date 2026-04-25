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
import orderRoutes from './routes/order.routes.js';
import cartRoutes from './routes/cart.routes.js';
import propertyRoutes from './routes/property.routes.js';
import tourRoutes from './routes/tour.routes.js';
import shopRoutes from './routes/shop.routes.js';
import weatherRoutes from './routes/weather.routes.js';
import approvalRoutes from './routes/approval.routes.js';
import adminRoutes from './routes/admin.routes.js';

dotenv.config();

const app = express();

// ✅ UPDATED CORS Configuration for Production
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:5173',
  'http://localhost:5174',
  'https://jharkhand-tourism-bjmk.vercel.app',  // Your Vercel frontend
  'https://jharkhand-tourism1-8mzk.vercel.app/',
  'https://*.vercel.app',                       // Any Vercel preview deployments
  process.env.FRONTEND_URL
].filter(Boolean);

app.use(cors({
  origin: function(origin, callback) {
    // Allow requests with no origin (like mobile apps or curl)
    if (!origin) return callback(null, true);
    
    // Check if origin is allowed
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } 
    // Allow any vercel.app subdomain (for preview deployments)
    else if (origin.endsWith('.vercel.app')) {
      callback(null, true);
    }
    else {
      console.warn(`CORS blocked origin: ${origin}`);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
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
app.use('/api/orders', orderRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/properties', propertyRoutes);
app.use('/api/tours', tourRoutes);
app.use('/api/shop', shopRoutes);
app.use('/api/weather', weatherRoutes);
app.use('/api/approvals', approvalRoutes);
app.use('/api/admin', adminRoutes);

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
    status: 'running',
    endpoints: {
      auth: '/api/auth',
      destinations: '/api/destinations',
      homestays: '/api/homestays',
      products: '/api/products',
      health: '/health'
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
