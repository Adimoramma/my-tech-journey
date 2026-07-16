// server.js
// Day 22: CRUD with MongoDB

require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/User');

const app = express();
app.use(express.json());

// ----- CONNECT TO MONGODB -----
const MONGO_URI = process.env.MONGO_URI;
const PORT = process.env.PORT || 3000;

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
        <h1>👤 User CRUD API</h1>
        <p>Connected to MongoDB: ${mongoose.connection.readyState === 1 ? '✅' : '❌'}</p>
        <p>Available routes:</p>
        <ul>
            <li><strong>GET</strong> /users - Get all users</li>
            <li><strong>GET</strong> /users/:id - Get a single user</li>
            <li><strong>POST</strong> /users - Create a new user</li>
            <li><strong>PUT</strong> /users/:id - Update a user (full)</li>
            <li><strong>PATCH</strong> /users/:id - Update a user (partial)</li>
            <li><strong>DELETE</strong> /users/:id - Delete a user</li>
            <li><strong>GET</strong> /users/count - Get user count</li>
            <li><strong>GET</strong> /users/search?q=name - Search users</li>
            <li><strong>DELETE</strong> /users - Delete all users</li>
        </ul>
    `);
});

// =============================================
// CREATE - POST /users
// =============================================
app.post('/users', async (req, res) => {
    try {
        const userData = req.body;
        const user = new User(userData);
        const savedUser = await user.save();
        res.status(201).json({
            message: '✅ User created successfully!',
            user: savedUser
        });
    } catch (error) {
        if (error.name === 'ValidationError') {
            const errors = Object.values(error.errors).map(e => e.message);
            return res.status(400).json({ 
                message: 'Validation failed',
                errors: errors
            });
        }
        res.status(400).json({ message: error.message });
    }
});

// =============================================
// READ (All) - GET /users
// =============================================
app.get('/users', async (req, res) => {
    try {
        // Get all users, sort by createdAt (newest first)
        const users = await User.find()
            .sort({ createdAt: -1 });
        
        res.json({
            count: users.length,
            users: users
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// =============================================
// READ (One) - GET /users/:id
// =============================================
app.get('/users/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        
        res.json(user);
    } catch (error) {
        // Check if the ID is a valid MongoDB ID
        if (error.name === 'CastError') {
            return res.status(400).json({ message: 'Invalid user ID format' });
        }
        res.status(500).json({ message: error.message });
    }
});

// =============================================
// READ (Search) - GET /users/search?q=name
// =============================================
app.get('/users/search', async (req, res) => {
    try {
        const query = req.query.q;
        
        if (!query) {
            return res.status(400).json({ 
                message: 'Please provide a search query: ?q=name' 
            });
        }
        
        // Search by name (case-insensitive partial match)
        const users = await User.find({
            name: { $regex: query, $options: 'i' }
        });
        
        res.json({
            count: users.length,
            query: query,
            users: users
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// =============================================
// READ (Count) - GET /users/count
// =============================================
app.get('/users/count', async (req, res) => {
    try {
        const count = await User.countDocuments();
        res.json({
            totalUsers: count
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// =============================================
// UPDATE (Full) - PUT /users/:id
// =============================================
app.put('/users/:id', async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            req.body,
            { 
                new: true,          // Return the updated document
                runValidators: true // Run validation on update
            }
        );
        
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        
        res.json({
            message: '✅ User updated successfully!',
            user: updatedUser
        });
    } catch (error) {
        if (error.name === 'ValidationError') {
            const errors = Object.values(error.errors).map(e => e.message);
            return res.status(400).json({ 
                message: 'Validation failed',
                errors: errors
            });
        }
        if (error.name === 'CastError') {
            return res.status(400).json({ message: 'Invalid user ID format' });
        }
        res.status(500).json({ message: error.message });
    }
});

// =============================================
// UPDATE (Partial) - PATCH /users/:id
// =============================================
app.patch('/users/:id', async (req, res) => {
    try {
        // Only update the fields provided in the request
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            req.body,
            { 
                new: true,
                runValidators: true
            }
        );
        
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        
        res.json({
            message: '✅ User updated successfully!',
            user: updatedUser
        });
    } catch (error) {
        if (error.name === 'ValidationError') {
            const errors = Object.values(error.errors).map(e => e.message);
            return res.status(400).json({ 
                message: 'Validation failed',
                errors: errors
            });
        }
        if (error.name === 'CastError') {
            return res.status(400).json({ message: 'Invalid user ID format' });
        }
        res.status(500).json({ message: error.message });
    }
});

// =============================================
// DELETE (One) - DELETE /users/:id
// =============================================
app.delete('/users/:id', async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        
        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        
        res.json({
            message: '✅ User deleted successfully!',
            deletedUser: deletedUser
        });
    } catch (error) {
        if (error.name === 'CastError') {
            return res.status(400).json({ message: 'Invalid user ID format' });
        }
        res.status(500).json({ message: error.message });
    }
});

// =============================================
// DELETE (All) - DELETE /users
// =============================================
app.delete('/users', async (req, res) => {
    try {
        const result = await User.deleteMany({});
        res.json({
            message: `✅ ${result.deletedCount} users deleted successfully!`
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// ----- START SERVER -----
app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
    console.log('\n📌 Available routes:');
    console.log(`  GET    /users              - Get all users`);
    console.log(`  GET    /users/:id          - Get a single user`);
    console.log(`  GET    /users/search?q=... - Search users by name`);
    console.log(`  GET    /users/count        - Get user count`);
    console.log(`  POST   /users              - Create a new user`);
    console.log(`  PUT    /users/:id          - Update a user (full)`);
    console.log(`  PATCH  /users/:id          - Update a user (partial)`);
    console.log(`  DELETE /users/:id          - Delete a user`);
    console.log(`  DELETE /users              - Delete ALL users`);
});