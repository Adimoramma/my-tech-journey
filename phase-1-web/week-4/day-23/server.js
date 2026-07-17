// server.js
// Day 23: JWT Authentication

require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = require('./models/User');
const { protect, adminOnly } = require('./middleware/auth');

const app = express();
app.use(express.json());

// ----- CONNECT TO MONGODB -----
const MONGO_URI = process.env.MONGO_URI;
const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET;

// Check if JWT_SECRET is set
if (!JWT_SECRET) {
    console.error('❌ JWT_SECRET is not set in .env file!');
    process.exit(1);
}

mongoose.connect(MONGO_URI)
    .then(() => {
        console.log('✅ Connected to MongoDB');
        console.log(`📊 Database: ${mongoose.connection.name}`);
    })
    .catch(err => {
        console.error('❌ MongoDB connection error:', err.message);
        process.exit(1);
    });

// ----- HOME ROUTE -----
app.get('/', (req, res) => {
    res.send(`
        <h1>🔐 JWT Authentication API</h1>
        <p>Connected to MongoDB: ${mongoose.connection.readyState === 1 ? '✅' : '❌'}</p>
        <p>Available routes:</p>
        <ul>
            <li><strong>POST</strong> /auth/register - Register a new user</li>
            <li><strong>POST</strong> /auth/login - Login and get token</li>
            <li><strong>GET</strong> /profile - Get current user (Protected)</li>
            <li><strong>GET</strong> /users - Get all users (Admin only)</li>
        </ul>
    `);
});

// =============================================
// AUTH ROUTES
// =============================================

// ----- 1. REGISTER -----
// POST /auth/register
// Body: { "name": "...", "email": "...", "password": "...", "country": "..." }
app.post('/auth/register', async (req, res) => {
    try {
        const { name, email, password, country, skills } = req.body;
        
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                message: 'User already exists with this email'
            });
        }
        
        // Create new user (password will be hashed by pre-save hook)
        const user = new User({
            name,
            email,
            password,
            country,
            skills: skills || []
        });
        
        await user.save();
        
        // Generate JWT token
        const token = jwt.sign(
            { userId: user._id, role: user.role },
            JWT_SECRET,
            { expiresIn: '7d' }
        );
        
        res.status(201).json({
            message: 'User registered successfully!',
            token: token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                country: user.country,
                skills: user.skills
            }
        });
    } catch (error) {
        if (error.name === 'ValidationError') {
            const errors = Object.values(error.errors).map(e => e.message);
            return res.status(400).json({ 
                message: 'Validation failed',
                errors: errors
            });
        }
        res.status(500).json({ message: error.message });
    }
});

// ----- 2. LOGIN -----
// POST /auth/login
// Body: { "email": "...", "password": "..." }
app.post('/auth/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        
        // Check if email and password are provided
        if (!email || !password) {
            return res.status(400).json({
                message: 'Email and password are required'
            });
        }
        
        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({
                message: 'Invalid email or password'
            });
        }
        
        // Check password
        const isPasswordCorrect = await user.comparePassword(password);
        if (!isPasswordCorrect) {
            return res.status(401).json({
                message: 'Invalid email or password'
            });
        }
        
        // Generate JWT token
        const token = jwt.sign(
            { userId: user._id, role: user.role },
            JWT_SECRET,
            { expiresIn: '7d' }
        );
        
        res.json({
            message: 'Login successful!',
            token: token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                country: user.country,
                skills: user.skills
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// ----- 3. GET PROFILE (Protected) -----
// GET /profile
// Header: Authorization: Bearer <token>
app.get('/profile', protect, async (req, res) => {
    try {
        const user = await User.findById(req.userId).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({
            message: 'Profile data',
            user: user
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// ----- 4. GET ALL USERS (Admin only) -----
// GET /users
// Header: Authorization: Bearer <admin_token>
app.get('/users', protect, adminOnly, async (req, res) => {
    try {
        const users = await User.find().select('-password');
        res.json({
            count: users.length,
            users: users
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// ----- START SERVER -----
app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
    console.log(`🔐 JWT Secret: ${JWT_SECRET ? '✅ Set' : '❌ Not set'}`);
    console.log('\n📌 Auth routes:');
    console.log(`  POST   /auth/register  - Register a new user`);
    console.log(`  POST   /auth/login     - Login and get token`);
    console.log(`  GET    /profile        - Get profile (Protected)`);
    console.log(`  GET    /users          - Get all users (Admin only)`);
});