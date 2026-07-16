// server.js
// Day 21: Mongoose Schemas & Models

require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

// Import models
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
        <h1>👤 User API with Mongoose</h1>
        <p>Connected to MongoDB: ${mongoose.connection.readyState === 1 ? '✅' : '❌'}</p>
        <p>Available routes:</p>
        <ul>
            <li><strong>GET</strong> /users - Get all users</li>
            <li><strong>GET</strong> /users/:id - Get a single user</li>
            <li><strong>POST</strong> /users - Create a new user</li>
            <li><strong>PUT</strong> /users/:id - Update a user</li>
            <li><strong>DELETE</strong> /users/:id - Delete a user</li>
        </ul>
    `);
});

// ----- CREATE A USER -----
app.post('/users', async (req, res) => {
    try {
        const userData = req.body;
        const user = new User(userData);
        const savedUser = await user.save();
        res.status(201).json({
            message: 'User created successfully!',
            user: savedUser
        });
    } catch (error) {
        // Handle validation errors
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

// ----- GET ALL USERS -----
app.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// ----- GET A SINGLE USER -----
app.get('/users/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// ----- UPDATE A USER -----
app.put('/users/:id', async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({
            message: 'User updated successfully!',
            user: updatedUser
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// ----- DELETE A USER -----
app.delete('/users/:id', async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// ----- DEMO: STATIC METHOD -----
app.get('/demo/active-users', async (req, res) => {
    try {
        const users = await User.findActiveUsers();
        res.json(users);
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
    console.log(`  POST   /users              - Create a new user`);
    console.log(`  PUT    /users/:id          - Update a user`);
    console.log(`  DELETE /users/:id          - Delete a user`);
    console.log(`  GET    /demo/active-users  - Demo: static method`);
});