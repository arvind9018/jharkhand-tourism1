// backend/src/scripts/create-test-approvals.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load env from root directory (two levels up from src/scripts)
dotenv.config({ path: path.join(__dirname, '../../.env') });

// Import models from correct path (one level up from scripts to models)
import Approval from '../models/Approval.model.js';
import User from '../models/User.model.js';

const createTestApprovals = async () => {
  try {
    console.log('🔄 Connecting to MongoDB...');
    console.log('MongoDB URI:', process.env.MONGODB_URI);
    
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');
    
    // Find a user to associate with approvals
    let user = await User.findOne({ role: { $in: ['user', 'admin'] } });
    
    if (!user) {
      console.log('⚠️ No user found. Creating a test user...');
      
      // Create a test user if none exists
      const bcrypt = await import('bcryptjs');
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash('test123', salt);
      
      user = await User.create({
        name: 'Test User',
        email: 'testuser@example.com',
        password: hashedPassword,
        role: 'user',
        approvalStatus: 'pending'
      });
      console.log('✅ Created test user:', user.email);
    }
    
    console.log('📝 Using user:', user.name, '(' + user.email + ')');
    
    // Clear existing approvals
    await Approval.deleteMany({});
    console.log('🗑️ Cleared existing approvals');
    
    const approvals = [
      {
        userId: user._id,
        type: 'ARTISAN',
        name: 'Handicraft Artisan Application',
        submittedBy: {
          userId: user._id,
          name: user.name,
          email: user.email
        },
        details: {
          experience: '5 years',
          craftType: 'Dokra Metal Art',
          village: 'Khunti',
          portfolio: ['https://example.com/art1.jpg', 'https://example.com/art2.jpg']
        },
        status: 'pending'
      },
      {
        userId: user._id,
        type: 'GUIDE',
        name: 'Tour Guide Application',
        submittedBy: {
          userId: user._id,
          name: user.name,
          email: user.email
        },
        details: {
          languages: ['Hindi', 'English', 'Santhali'],
          experience: '3 years',
          certifications: ['Tourism Guide License', 'First Aid Certified'],
          areas: ['Netarhat', 'Hundru Falls', 'Betla National Park']
        },
        status: 'pending'
      },
      {
        userId: user._id,
        type: 'VENDOR',
        name: 'Handicraft Vendor Registration',
        submittedBy: {
          userId: user._id,
          name: user.name,
          email: user.email
        },
        details: {
          shopName: 'Tribal Art Emporium',
          location: 'Ranchi',
          gstNumber: '22AAAAA0000A1Z',
          categories: ['Handicrafts', 'Artifacts', 'Traditional Wear']
        },
        status: 'pending'
      }
    ];
    
    const result = await Approval.insertMany(approvals);
    console.log(`\n✅ Created ${result.length} test approvals!`);
    
    console.log('\n📋 Approvals created:');
    result.forEach(approval => {
      console.log(`   - ${approval.type}: ${approval.name} (${approval.status})`);
    });
    
    console.log('\n💡 You can now view these approvals in the Admin Dashboard → Pending Approvals tab');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
};

createTestApprovals();