const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const rateLimit = require('express-rate-limit');
const { body, validationResult } = require('express-validator');

const Product = require('./models/Product');
const Order = require('./models/Order');
const User = require('./models/User');
const sendEmail = require('./utils/sendEmail');

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors({
    origin: process.env.NODE_ENV === 'production'
        ? [process.env.FRONTEND_URL, process.env.ADMIN_URL]
        : ['http://localhost:3000', 'http://localhost:5173', 'http://127.0.0.1:5173', '*'],
    credentials: true
}));
app.use(express.json());

// --- Security Enhancements ---

// Global Rate Limiter
const globalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per window
    standardHeaders: true,
    legacyHeaders: false,
    message: { message: "Too many requests from this IP, please try again after 15 minutes" }
});
app.use(globalLimiter);

// Stricter Rate Limiter for Auth and Orders
const authOrderLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 10, // Limit each IP to 10 requests per hour for sensitive actions
    standardHeaders: true,
    legacyHeaders: false,
    message: { message: "Too many attempts from this IP, please try again later" }
});

// Validation Middleware Helper
const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

// Validation Schemas
const registerValidation = [
    body('name').trim().notEmpty().withMessage('Name is required').isLength({ max: 100 }),
    body('email').isEmail().withMessage('Invalid email').normalizeEmail(),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    validate
];

const loginValidation = [
    body('email').isEmail().withMessage('Invalid email').normalizeEmail(),
    body('password').notEmpty().withMessage('Password is required'),
    validate
];

const orderValidation = [
    body('customer.name').trim().notEmpty().withMessage('Customer name is required'),
    body('customer.email').isEmail().withMessage('Invalid customer email'),
    body('customer.address').trim().notEmpty().withMessage('Address is required'),
    body('customer.city').trim().notEmpty().withMessage('City is required'),
    body('customer.zip').trim().notEmpty().withMessage('Zip code is required').isLength({ min: 5, max: 10 }),
    body('items').isArray({ min: 1 }).withMessage('Items must be a non-empty array'),
    body('items.*.id').notEmpty().withMessage('Product ID is required'),
    body('items.*.name').notEmpty().withMessage('Product name is required'),
    body('items.*.price').isNumeric().withMessage('Product price must be a number'),
    body('total').isNumeric().withMessage('Total must be a number'),
    validate
];

// Get all products
app.get('/api/products', async (req, res) => {
    try {
        const products = await Product.find({});
        res.json(products);
    } catch (err) {
        console.error("Error reading products:", err);
        res.status(500).json({ message: "Server error fetching products" });
    }
});

// Get single product
app.get('/api/products/:id', async (req, res) => {
    try {
        const product = await Product.findOne({ id: req.params.id });

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.json(product);
    } catch (err) {
        console.error("Error reading product:", err);
        res.status(500).json({ message: "Server error fetching product" });
    }
});



// Place an order
app.post('/api/orders', authOrderLimiter, orderValidation, async (req, res) => {
    try {
        const { items, total, customer } = req.body;

        if (!items || items.length === 0) {
            return res.status(400).json({ message: "Cart is empty" });
        }

        const newOrder = new Order({
            id: Date.now().toString(), // Ensure string ID
            customer,
            items,
            total,
            status: 'Processing'
        });

        const createdOrder = await newOrder.save();

        // Send confirmation email
        try {
            const emailMessage = `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h1 style="color: #333;">Thank you for your order!</h1>
                    <p>Hi ${customer.name},</p>
                    <p>We received your order on <strong>${new Date().toLocaleString()}</strong>.</p>
                    <h3 style="border-bottom: 2px solid #eee; padding-bottom: 10px;">Order Summary</h3>
                    <table style="width: 100%; border-collapse: collapse;">
                        ${items.map(item => `
                            <tr>
                                <td style="padding: 10px; border-bottom: 1px solid #eee;">
                                    ${item.image ? `<img src="${item.image}" alt="${item.name}" style="width: 50px; height: 50px; object-fit: cover; border-radius: 4px;">` : ''}
                                </td>
                                <td style="padding: 10px; border-bottom: 1px solid #eee;">
                                    <strong>${item.name}</strong><br>
                                    ${item.selectedSize ? `<span style="color: #666; font-size: 0.9em;">Size: ${item.selectedSize}</span>` : ''}
                                </td>
                                <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: right;">
                                    ₹${item.price}
                                </td>
                            </tr>
                        `).join('')}
                    </table>
                    <div style="text-align: right; margin-top: 20px; font-size: 1.2em;">
                        <strong>Total: ₹${total.toLocaleString()}</strong>
                    </div>
                </div>
            `;

            await sendEmail({
                email: customer.email,
                subject: 'WishMade Order Confirmation',
                message: emailMessage
            });
        } catch (emailError) {
            console.error("Failed to send email:", emailError);
            // Don't fail the order just because email failed
        }

        res.status(201).json({ message: "Order placed successfully", orderId: createdOrder.id });
    } catch (err) {
        console.error("Error placing order:", err);
        res.status(500).json({ message: "Server error placing order" });
    }
});

// Register
app.post('/api/auth/register', authOrderLimiter, registerValidation, async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashedPassword
        });

        const token = jwt.sign({ id: user._id, name: user.name }, process.env.JWT_SECRET, {
            expiresIn: '30d'
        });

        res.status(201).json({
            token,
            user: { id: user._id, name: user.name, email: user.email }
        });

    } catch (err) {
        console.error("Error registering user:", err);
        res.status(500).json({ message: "Server error during registration" });
    }
});

// Login
app.post('/api/auth/login', authOrderLimiter, loginValidation, async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({ id: user._id, name: user.name }, process.env.JWT_SECRET, {
            expiresIn: '30d'
        });

        res.json({
            token,
            user: { id: user._id, name: user.name, email: user.email }
        });

    } catch (err) {
        console.error("Error logging in:", err);
        res.status(500).json({ message: "Server error during login" });
    }
});

const { protect, admin } = require('./middleware/authMiddleware');

// Get Logged in User orders
app.get('/api/orders/myorders', protect, async (req, res) => {
    try {
        const orders = await Order.find({ 'customer.email': req.user.email });
        res.json(orders);
    } catch (err) {
        console.error("Error fetching user orders:", err);
        res.status(500).json({ message: "Server error fetching orders" });
    }
});

// Get all orders (Protected, Admin only)
app.get('/api/orders', protect, admin, async (req, res) => {
    try {
        const orders = await Order.find({}).populate('customer', 'name email');
        res.json(orders);
    } catch (err) {
        console.error("Error fetching orders:", err);
        res.status(500).json({ message: "Server error fetching orders" });
    }
});

// Get User Profile
app.get('/api/users/profile', protect, async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        if (user) {
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                address: user.address,
                city: user.city,
                zip: user.zip
            });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Update User Profile
app.put('/api/users/profile', protect, async (req, res) => {
    try {
        const user = await User.findById(req.user._id);

        if (user) {
            user.name = req.body.name || user.name;
            user.email = req.body.email || user.email;
            if (req.body.password) {
                user.password = await bcrypt.hash(req.body.password, 10);
            }
            // Update address info
            user.address = req.body.address || user.address;
            user.city = req.body.city || user.city;
            user.zip = req.body.zip || user.zip;

            const updatedUser = await user.save();

            res.json({
                _id: updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email,
                isAdmin: updatedUser.isAdmin,
                token: jwt.sign({ id: updatedUser._id, name: updatedUser.name }, process.env.JWT_SECRET, {
                    expiresIn: '30d'
                }),
                address: updatedUser.address,
                city: updatedUser.city,
                zip: updatedUser.zip
            });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

app.listen(PORT, () => {
    console.log(`Backend server functionality running on http://localhost:${PORT}`);
});
