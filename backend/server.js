const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

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
app.post('/api/orders', async (req, res) => {
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
app.post('/api/auth/register', async (req, res) => {
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
app.post('/api/auth/login', async (req, res) => {
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
