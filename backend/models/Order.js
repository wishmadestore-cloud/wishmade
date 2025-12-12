const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    id: { type: String, required: true, unique: true }, // Using String to match timestamp-based IDs
    customer: {
        name: { type: String, required: true },
        email: { type: String, required: true },
        address: { type: String, required: true },
        city: { type: String, required: true },
        zip: { type: String, required: true }
    },
    items: [{
        id: { type: Number, required: true },
        name: { type: String, required: true },
        price: { type: Number, required: true },
        image: { type: String },
        selectedSize: { type: String }
    }],
    total: { type: Number, required: true },
    status: { type: String, required: true, default: 'Pending' },
    date: { type: Date, default: Date.now }
}, {
    timestamps: true
});

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
