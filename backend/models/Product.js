const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    id: { type: Number, required: true, unique: true }, // Keeping ID for compatibility with frontend routes
    name: { type: String, required: true },
    price: { type: Number, required: true },
    gender: { type: String, required: true, enum: ['Men', 'Women', 'Unisex'] },
    category: { type: String, required: true }, // Keeping for broad category or removing if redundant? Plan said rename usage, but maintaining 'category' for now as "wearable type" might be safer or use subCategory.
    // Let's follow the plan: "Rename current category usage to gender where appropriate... Add subCategory".
    // Actually, looking at current data: "category": "Men" or "Women". So current 'category' IS gender.
    // I will use 'gender' for Men/Women and 'subCategory' for Top/Bottom etc.
    subCategory: { type: String, required: true },
    image: { type: String, required: true },
    description: { type: String, required: true },
    sizes: [{ type: String }]
}, {
    timestamps: true
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
