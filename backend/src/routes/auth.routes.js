// backend/src/routes/auth.routes.js
import express from 'express';
import { 
  signup, 
  login, 
  logout, 
  getMe, 
  updateProfile,
  changePassword
} from '../controllers/auth.controller.js';
import { protect } from '../middleware/auth.middleware.js';
import { getUserPermissions } from '../middleware/permission.middleware.js';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import User from '../models/User.model.js';

const router = express.Router();

// ============ PUBLIC ROUTES (NO AUTHENTICATION NEEDED) ============
router.post('/signup', signup);
router.post('/login', login);

// Google OAuth - PUBLIC
router.post('/google', async (req, res) => {
  try {
    const { access_token } = req.body; // Changed from credential to access_token
    
    console.log('Google auth request received');
    
    // Get user info from Google
    const response = await axios.get(
      `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${access_token}`
    );
    
    const { email, name, picture } = response.data;
    console.log('Google user:', email);

    // Check if user exists
    let user = await User.findOne({ email });
    
    if (!user) {
      // Create new user
      user = await User.create({
        name,
        email,
        avatar: picture,
        password: Math.random().toString(36),
        role: 'user',
        emailVerified: true
      });
      console.log('New user created:', email);
    }

    // Generate JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '30d'
    });

    res.json({
      success: true,
      data: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          avatar: user.avatar,
          role: user.role
        },
        token
      }
    });
  } catch (error) {
    console.error('Google auth error:', error);
    res.status(500).json({ success: false, message: 'Google authentication failed' });
  }
});

// Facebook OAuth - PUBLIC
router.post('/facebook', async (req, res) => {
  try {
    const { accessToken, userID } = req.body;
    
    // Validate input
    if (!accessToken || !userID) {
      return res.status(400).json({ 
        success: false, 
        message: 'Missing access token or user ID' 
      });
    }
    
    console.log('Facebook auth request received for user:', userID);
    
    // Verify Facebook token and get user info
    const response = await axios.get(
      `https://graph.facebook.com/v18.0/${userID}?fields=id,name,email,picture&access_token=${accessToken}`
    );
    
    const { email, name, picture } = response.data;
    
    // Check if email exists (user might have privacy settings)
    if (!email) {
      return res.status(400).json({ 
        success: false, 
        message: 'Email not provided by Facebook. Please ensure your email is public or use another login method.' 
      });
    }
    
    if (!name) {
      return res.status(400).json({ 
        success: false, 
        message: 'Name not provided by Facebook.' 
      });
    }
    
    console.log('Facebook user:', email);

    // Extract picture URL correctly
    const pictureUrl = picture?.data?.url || null;

    // Check if user exists
    let user = await User.findOne({ email });
    
    if (!user) {
      // Create new user
      user = await User.create({
        name,
        email,
        avatar: pictureUrl,
        password: Math.random().toString(36), // Random password
        role: 'user',
        emailVerified: true,
        provider: 'facebook',
        providerId: userID
      });
      console.log('✅ New user created from Facebook:', email);
    } else {
      // Update existing user's Facebook info if needed
      if (!user.avatar && pictureUrl) {
        user.avatar = pictureUrl;
        user.provider = 'facebook';
        user.providerId = userID;
        await user.save();
        console.log('✅ Updated existing user with Facebook data:', email);
      }
    }

    // Generate JWT
    const token = jwt.sign(
      { id: user._id }, 
      process.env.JWT_SECRET, 
      { expiresIn: '30d' }
    );

    res.json({
      success: true,
      message: 'Facebook authentication successful',
      data: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          avatar: user.avatar,
          role: user.role
        },
        token
      }
    });
    
  } catch (error) {
    console.error('❌ Facebook auth error:', error.response?.data || error.message);
    
    // Handle specific Facebook API errors
    if (error.response?.data?.error) {
      const fbError = error.response.data.error;
      if (fbError.code === 100) {
        return res.status(401).json({ 
          success: false, 
          message: 'Invalid or expired Facebook token' 
        });
      }
      if (fbError.code === 190) {
        return res.status(401).json({ 
          success: false, 
          message: 'Facebook access token has expired' 
        });
      }
    }
    
    res.status(500).json({ 
      success: false, 
      message: 'Facebook authentication failed. Please try again.' 
    });
  }
});

// ============ PROTECTED ROUTES (NEED AUTHENTICATION) ============
router.use(protect); // All routes below this require authentication

router.get('/me', getMe);
router.put('/profile', updateProfile);
router.post('/change-password', changePassword);
router.post('/logout', logout);
// Add this with other protected routes
router.get('/permissions', protect,getUserPermissions);
export default router;