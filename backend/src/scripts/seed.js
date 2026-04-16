// backend/src/scripts/seed.js (corrected version)
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import bcrypt from 'bcryptjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../../.env') });

import Destination from '../models/Destination.model.js';
import Homestay from '../models/Homestay.model.js';
import Product from '../models/Product.model.js';
import User from '../models/User.model.js';

const seedDatabase = async () => {
  try {
    console.log('🔄 Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    console.log('🗑️ Clearing existing data...');
    await User.deleteMany({});
    await Destination.deleteMany({});
    await Homestay.deleteMany({});
    await Product.deleteMany({});
    console.log('✅ Cleared existing data');

    // ==================== CREATE USERS ====================
    console.log('\n📥 Creating users...');
    
    // Hash passwords properly
    const salt = await bcrypt.genSalt(10);
    
    const usersData = [
      { name: "Admin User", email: "admin@jharkhandtourism.com", password: await bcrypt.hash("admin123", salt), role: "admin", phone: "9876543210" },
      { name: "Birsa Hansda", email: "birsa@dokraart.com", password: await bcrypt.hash("artisan123", salt), role: "artisan", phone: "9876543211" },
      { name: "Sita Devi", email: "sita@paitkarart.com", password: await bcrypt.hash("artisan123", salt), role: "artisan", phone: "9876543212" },
      { name: "Ramesh Munda", email: "ramesh@bamboocraft.com", password: await bcrypt.hash("artisan123", salt), role: "artisan", phone: "9876543213" },
      { name: "Rajesh Kumar", email: "rajesh@homestay.com", password: await bcrypt.hash("owner123", salt), role: "homestay_owner", phone: "9876543214" },
      { name: "Munda Family", email: "munda@ecohomestay.com", password: await bcrypt.hash("owner123", salt), role: "homestay_owner", phone: "9876543215" },
      { name: "Santhal Guide", email: "guide@santhal.com", password: await bcrypt.hash("guide123", salt), role: "guide", phone: "9876543216" },
      { name: "Vijay Vendor", email: "vijay@handicrafts.com", password: await bcrypt.hash("vendor123", salt), role: "vendor", phone: "9876543217" },
      { name: "Regular User", email: "user@example.com", password: await bcrypt.hash("user123", salt), role: "user", phone: "9876543218" }
    ];

    const createdUsers = await User.insertMany(usersData);
    console.log(`✅ Created ${createdUsers.length} users`);

    // Get user references
    const birsa = createdUsers.find(u => u.email === "birsa@dokraart.com");
    const sita = createdUsers.find(u => u.email === "sita@paitkarart.com");
    const ramesh = createdUsers.find(u => u.email === "ramesh@bamboocraft.com");
    const rajesh = createdUsers.find(u => u.email === "rajesh@homestay.com");
    const munda = createdUsers.find(u => u.email === "munda@ecohomestay.com");

    // ==================== CREATE DESTINATIONS ====================
    console.log('\n📥 Creating destinations...');
    const destinations = [
      {
        name: "Netarhat",
        description: "Known as the 'Queen of Chotanagpur', Netarhat is a beautiful hill station offering breathtaking sunsets.",
        category: "Hill",
        district: "Latehar",
        location: { address: "Netarhat, Latehar District", coordinates: { lat: 23.4833, lng: 84.2667 } },
        images: [{ url: "https://images.unsplash.com/photo-1625505826533-5c80aca7d656?w=800", isPrimary: true }],
        rating: { average: 4.5, count: 128 },
        bestTimeToVisit: "October to March",
        entryFee: { indian: 20, foreigner: 100 },
        openingHours: "6:00 AM - 6:00 PM",
        facilities: ["Parking", "Restrooms", "Cafeteria", "Guide Service"],
        nearbyAttractions: [
          { name: "Upper Ghaghri Falls", distance: "12 km", type: "Waterfall" },
          { name: "Sunset Point", distance: "3 km", type: "Viewpoint" }
        ]
      },
      {
        name: "Hundru Falls",
        description: "One of the most famous waterfalls in Jharkhand, plunging from a height of 98 meters.",
        category: "Waterfall",
        district: "Ranchi",
        location: { address: "Hundru, Ranchi District", coordinates: { lat: 23.45, lng: 85.65 } },
        images: [{ url: "https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?w=800", isPrimary: true }],
        rating: { average: 4.3, count: 95 },
        bestTimeToVisit: "July to October (Monsoon)",
        entryFee: { indian: 15, foreigner: 75 },
        openingHours: "6:00 AM - 6:00 PM",
        facilities: ["Parking", "Viewing Platform"],
        nearbyAttractions: [
          { name: "Jonha Falls", distance: "20 km", type: "Waterfall" },
          { name: "Ranchi Hill", distance: "25 km", type: "Hill" }
        ]
      },
      {
        name: "Betla National Park",
        description: "One of India's first tiger reserves, home to tigers, elephants, and bisons.",
        category: "Wildlife",
        district: "Latehar",
        location: { address: "Betla, Latehar District", coordinates: { lat: 23.88, lng: 84.18 } },
        images: [{ url: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=800", isPrimary: true }],
        rating: { average: 4.6, count: 156 },
        bestTimeToVisit: "November to March",
        entryFee: { indian: 50, foreigner: 500 },
        openingHours: "6:00 AM - 6:00 PM",
        facilities: ["Parking", "Guide Service", "Watch Towers", "Canteen"],
        nearbyAttractions: [
          { name: "Palamu Fort", distance: "10 km", type: "Heritage" },
          { name: "Koel River", distance: "5 km", type: "River" }
        ]
      }
    ];

    const insertedDestinations = await Destination.insertMany(destinations);
    console.log(`✅ Inserted ${insertedDestinations.length} destinations`);

    // ==================== CREATE HOMESTAYS ====================
    console.log('\n📥 Creating homestays...');
    const homestays = [
      {
        name: "Santhal Tribal Homestay",
        description: "Experience authentic Santhal culture with traditional food and music.",
        village: "Netarhat Village",
        district: "Latehar",
        price: 1200,
        capacity: 4,
        rating: { average: 4.6, count: 45 },
        images: [{ url: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800", isPrimary: true }],
        amenities: ["WiFi", "Meals", "Parking", "Guide Service"],
        owner: rajesh?._id
      },
      {
        name: "Munda Eco Homestay",
        description: "Eco-friendly homestay near Hundru Falls with organic farming.",
        village: "Hundru Area",
        district: "Ranchi",
        price: 1500,
        capacity: 3,
        rating: { average: 4.8, count: 32 },
        images: [{ url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800", isPrimary: true }],
        amenities: ["WiFi", "Breakfast", "Guide Service", "Pickup"],
        owner: munda?._id
      }
    ];

    const insertedHomestays = await Homestay.insertMany(homestays);
    console.log(`✅ Inserted ${insertedHomestays.length} homestays`);

    // ==================== CREATE PRODUCTS ====================
    console.log('\n📥 Creating products...');
    const products = [
      {
        name: "Dokra Tribal Horse",
        description: "Traditional Dokra metal craft, handcrafted by local artisans.",
        category: "Dokra",
        artisanName: "Birsa Hansda",
        village: "Khunti",
        district: "Khunti",
        price: 2500,
        rating: { average: 4.8, count: 56 },
        images: ["https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=400"],
        inStock: true,
        quantity: 5,
        artisan: birsa?._id
      },
      {
        name: "Paitkar Scroll Painting",
        description: "Ancient scroll painting art depicting tribal stories.",
        category: "Paitkar",
        artisanName: "Sita Devi",
        village: "Amadubi",
        district: "Pakur",
        price: 1800,
        rating: { average: 4.6, count: 42 },
        images: ["https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=400"],
        inStock: true,
        quantity: 3,
        artisan: sita?._id
      },
      {
        name: "Bamboo Hand Basket",
        description: "Handcrafted bamboo basket for daily use.",
        category: "Bamboo",
        artisanName: "Ramesh Munda",
        village: "Simdega",
        district: "Simdega",
        price: 900,
        rating: { average: 4.5, count: 28 },
        images: ["https://images.unsplash.com/photo-1525085475161-c80cdeb0b3c1?w=400"],
        inStock: true,
        quantity: 10,
        artisan: ramesh?._id
      }
    ];

    const insertedProducts = await Product.insertMany(products);
    console.log(`✅ Inserted ${insertedProducts.length} products`);

    // ==================== SUMMARY ====================
    console.log('\n🎉 Database seeded successfully!');
    console.log('\n📊 Summary:');
    console.log(`   👥 Users: ${createdUsers.length}`);
    console.log(`   🏞️ Destinations: ${insertedDestinations.length}`);
    console.log(`   🏡 Homestays: ${insertedHomestays.length}`);
    console.log(`   🛍️ Products: ${insertedProducts.length}`);

    console.log('\n🔐 Login Credentials:');
    usersData.forEach(async u => {
      console.log(`   ${u.email} / ${u.password === await bcrypt.hash("admin123", salt) ? "admin123" : u.password === await bcrypt.hash("artisan123", salt) ? "artisan123" : u.password === await bcrypt.hash("owner123", salt) ? "owner123" : u.password === await bcrypt.hash("guide123", salt) ? "guide123" : u.password === await bcrypt.hash("vendor123", salt) ? "vendor123" : "user123"}`);
    });

    process.exit(0);
  } catch (error) {
    console.error('\n❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();