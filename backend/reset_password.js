const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const connectDB = require('./config/db');
const User = require('./models/User');

dotenv.config();
connectDB();

const resetPassword = async () => {
    try {
        const email = 'henoantony.s@gmail.com';
        const password = 'admin123';
        const name = 'Admin User';

        let user = await User.findOne({ email });

        const hashedPassword = await bcrypt.hash(password, 10);

        if (!user) {
            console.log('User not found. Creating new admin user...');
            user = await User.create({
                name,
                email,
                password: hashedPassword,
                isAdmin: true
            });
            console.log(`✅ Admin user created successfully: ${email}`);
        } else {
            user.password = hashedPassword;
            user.isAdmin = true; // Ensure user is admin
            await user.save();
            console.log(`✅ Password reset successfully for ${email}`);
        }

        console.log(`Password: ${password}`);
        process.exit();
    } catch (error) {
        console.error(`❌ Error resetting password: ${error.message}`);
        process.exit(1);
    }
};

resetPassword();
