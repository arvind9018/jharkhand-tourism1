// backend/src/scripts/seed.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../../.env') });

import Destination from '../models/Destination.model.js';
import Homestay from '../models/Homestay.model.js';
import Product from '../models/Product.model.js';

console.log('📂 Seed file location:', __dirname);
console.log('🔑 MongoDB URI:', process.env.MONGODB_URI);

const destinations = [
  {
    name: "Netarhat",
    description: "Known as the 'Queen of Chotanagpur', Netarhat is a beautiful hill station offering breathtaking sunsets, dense forests, and pleasant weather.",
    category: "Hill",
    district: "Latehar",
    location: {
      address: "Netarhat, Latehar District",
      coordinates: { lat: 23.4833, lng: 84.2667 }
    },
    images: [
      { url: "https://images.unsplash.com/photo-1625505826533-5c80aca7d656?w=800", isPrimary: true },
      { url: "https://images.unsplash.com/photo-1625505826533-5c80aca7d656?w=800", caption: "Sunset Point" }
    ],
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
    description: "One of the most famous waterfalls in Jharkhand, plunging from a height of 98 meters on the Subarnarekha River.",
    category: "Waterfall",
    district: "Ranchi",
    location: {
      address: "Hundru, Ranchi District",
      coordinates: { lat: 23.45, lng: 85.65 }
    },
    images: [
      { url: "https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?w=800", isPrimary: true }
    ],
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
    description: "One of India's first tiger reserves, home to tigers, elephants, bisons, and various deer species.",
    category: "Wildlife",
    district: "Latehar",
    location: {
      address: "Betla, Latehar District",
      coordinates: { lat: 23.88, lng: 84.18 }
    },
    images: [
      { url: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=800", isPrimary: true }
    ],
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

const homestays = [
  {
    name: "Santhal Tribal Homestay",
    description: "Experience authentic Santhal culture with traditional food, music, and village life.",
    village: "Netarhat Village",
    district: "Latehar",
    price: 1200,
    capacity: 4,
    rating: { average: 4.6, count: 45 },
    images: [{ url: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800", isPrimary: true }],
    amenities: ["WiFi", "Meals", "Parking", "Guide Service"]
  },
  {
    name: "Munda Eco Homestay",
    description: "Eco-friendly homestay near Hundru Falls with organic farming experience.",
    village: "Hundru Area",
    district: "Ranchi",
    price: 1500,
    capacity: 3,
    rating: { average: 4.8, count: 32 },
    images: [{ url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800", isPrimary: true }],
    amenities: ["WiFi", "Breakfast", "Guide Service", "Pickup"]
  }
];

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
    quantity: 5
  },
  {
    name: "Paitkar Scroll Painting",
    description: "Ancient scroll painting art depicting tribal stories and traditions.",
    category: "Paitkar",
    artisanName: "Sita Devi",
    village: "Amadubi",
    district: "Pakur",
    price: 1800,
    rating: { average: 4.6, count: 42 },
    images: ["https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=400"],
    inStock: true,
    quantity: 3
  },
  {
    name: "Bamboo Hand Basket",
    description: "Handcrafted bamboo basket for daily use and decoration.",
    category: "Bamboo",
    artisanName: "Ramesh Munda",
    village: "Simdega",
    district: "Simdega",
    price: 900,
    rating: { average: 4.5, count: 28 },
    images: ["https://images.unsplash.com/photo-1525085475161-c80cdeb0b3c1?w=400"],
    inStock: true,
    quantity: 10
  }
];

const seedDatabase = async () => {
  try {
    console.log('🔄 Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    console.log('🗑️ Clearing existing data...');
    await Destination.deleteMany({});
    await Homestay.deleteMany({});
    await Product.deleteMany({});
    console.log('✅ Cleared existing data');

    console.log('📥 Inserting destinations...');
    const insertedDestinations = await Destination.insertMany(destinations);
    console.log(`✅ Inserted ${insertedDestinations.length} destinations`);

    console.log('📥 Inserting homestays...');
    const insertedHomestays = await Homestay.insertMany(homestays);
    console.log(`✅ Inserted ${insertedHomestays.length} homestays`);

    console.log('📥 Inserting products...');
    const insertedProducts = await Product.insertMany(products);
    console.log(`✅ Inserted ${insertedProducts.length} products`);

    console.log('\n🎉 Database seeded successfully!');
    console.log('\n📊 Summary:');
    console.log(`   - Destinations: ${insertedDestinations.length}`);
    console.log(`   - Homestays: ${insertedHomestays.length}`);
    console.log(`   - Products: ${insertedProducts.length}`);

    process.exit(0);
  } catch (error) {
    console.error('\n❌ Error seeding database:');
    console.error(error);
    process.exit(1);
  }
};

seedDatabase();