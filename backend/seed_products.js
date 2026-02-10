const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');
const connectDB = require('./config/db');

dotenv.config();

const testProducts = [
    {
        id: 101,
        name: 'Classic White T-Shirt',
        description: 'A comfortable and versatile classic white t-shirt made from 100% organic cotton.',
        price: 25,
        gender: 'Men',
        category: 'Apparel',
        subCategory: 'T-Shirts',
        image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        sizes: ['S', 'M', 'L', 'XL']
    },
    {
        id: 102,
        name: 'Denim Jacket',
        description: 'Stylish blue denim jacket with a modern fit, perfect for layering.',
        price: 75,
        gender: 'Women',
        category: 'Apparel',
        subCategory: 'Outerwear',
        image: 'https://images.unsplash.com/photo-1544441893-675973e31985?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        sizes: ['M', 'L']
    },
    {
        id: 103,
        name: 'Leather Boots',
        description: 'Durable and classic leather boots designed for both style and comfort.',
        price: 120,
        gender: 'Men',
        category: 'Apparel',
        subCategory: 'Footwear',
        image: 'https://images.unsplash.com/photo-1520639889313-7519730f37c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        sizes: ['XL']
    },
    {
        id: 104,
        name: 'Floral Summer Dress',
        description: 'Light and airy floral print dress, ideal for warm summer days.',
        price: 45,
        gender: 'Women',
        category: 'Apparel',
        subCategory: 'Dresses',
        image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        sizes: ['S', 'M']
    }
];

const seedProducts = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            serverSelectionTimeoutMS: 20000,
        });
        console.log('MongoDB Connected successfully for seeding...');

        // Use insertMany with ordered: false to skip duplicates if they exist, 
        // effectively fulfilling the "add" request.
        await Product.insertMany(testProducts, { ordered: false });
        console.log('4 Test products added successfully!');
        process.exit();
    } catch (error) {
        if (error.code === 11000) {
            console.log('Some products already exist. Insertion finished.');
            process.exit();
        }
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

seedProducts();
