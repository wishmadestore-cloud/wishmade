const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const Product = require('./models/Product');
const fs = require('fs');
const path = require('path');

dotenv.config();
connectDB();

const importData = async () => {
    try {
        const productsFilePath = path.join(__dirname, 'data', 'products.json');
        const productsData = fs.readFileSync(productsFilePath, 'utf8');
        const products = JSON.parse(productsData);

        await Product.deleteMany(); // Clear existing products

        const createdProducts = await Product.insertMany(products);
        console.log('✅ Data Imported!');
        console.log(`Checking DB connection string: ${process.env.MONGO_URI}`);
        process.exit();
    } catch (error) {
        console.error(`❌ Error with data import: ${error.message}`);
        process.exit(1);
    }
};

importData();
