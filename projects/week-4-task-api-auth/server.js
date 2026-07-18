// server.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = require('./models/User');
const Task = require('./models/Task');
const { protect } = require('./middleware/auth');

const app = express();
app.use(express.json());

// ----- CONNECT TO MONGODB -----
const MONGO_URI = process.env.MONGO_URI;
const PORT = process.env.PORT || 3000;

mongoose.connect(MONGO_URI)
    .then(() => console.log('✅ Connected to MongoDB'))
    .catch(err => {
        console.error('❌ MongoDB connection error:', err.message);
        process.exit(1);
    });

// ----- HOME -----
app.get('/', (req, res) => {
    res.send(`
        <h1>📝 Task API with JWT Auth</h1>
        <p>Connected to MongoDB: ${mongoose.connection.readyState === 1 ? '✅' : '❌'}</p>
        <p>Routes:</p>
        <ul>
            <li><strong>POST</strong> /auth/register - Register</li>
            <li><strong>POST</strong> /auth/login - Login</li>
            <li><strong>GET</strong> /tasks - Get all tasks</li>
            <li><strong>GET</strong> /tasks/:id - Get one task</li>
            <li><strong>POST</strong> /tasks - Create a task</li>
            <li><strong>PUT</strong> /tasks/:id - Update a task</li>
            <li><strong>DELETE</strong> /tasks/:id - Delete a task</li>
            <li><strong>GET</strong> /profile - Get profile</li>
        </ul>
    `);
});

// =============================================
// AUTH ROUTES
// =============================================

// Register
app.post('/auth/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }
        
        const user = new User({ name, email, password });
        await user.save();
        
        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );
        
        res.status(201).json({
            message: 'User registered successfully!',
            token,
            user: { id: user._id, name: user.name, email: user.email }
        });
    } catch (error) {
        if (error.name === 'ValidationError') {
            const errors = Object.values(error.errors).map(e => e.message);
            return res.status(400).json({ message: 'Validation failed', errors });
        }
        res.status(500).json({ message: error.message });
    }
});

// Login
app.post('/auth/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password required' });
        }
        
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        
        const isCorrect = await user.comparePassword(password);
        if (!isCorrect) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        
        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );
        
        res.json({
            message: 'Login successful!',
            token,
            user: { id: user._id, name: user.name, email: user.email }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// ----- PROFILE -----
app.get('/profile', protect, async (req, res) => {
    try {
        const user = await User.findById(req.userId).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// =============================================
// TASK ROUTES (Protected)
// =============================================

// Get all tasks for logged-in user
app.get('/tasks', protect, async (req, res) => {
    try {
        const tasks = await Task.find({ user: req.userId }).sort({ createdAt: -1 });
        res.json({
            count: tasks.length,
            tasks
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get a single task
app.get('/tasks/:id', protect, async (req, res) => {
    try {
        const task = await Task.findOne({
            _id: req.params.id,
            user: req.userId
        });
        
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        
        res.json(task);
    } catch (error) {
        if (error.name === 'CastError') {
            return res.status(400).json({ message: 'Invalid task ID' });
        }
        res.status(500).json({ message: error.message });
    }
});

// Create a new task
app.post('/tasks', protect, async (req, res) => {
    try {
        const { title } = req.body;
        
        if (!title) {
            return res.status(400).json({ message: 'Title is required' });
        }
        
        const task = new Task({
            title,
            user: req.userId
        });
        
        await task.save();
        res.status(201).json({
            message: 'Task created successfully!',
            task
        });
    } catch (error) {
        if (error.name === 'ValidationError') {
            const errors = Object.values(error.errors).map(e => e.message);
            return res.status(400).json({ message: 'Validation failed', errors });
        }
        res.status(500).json({ message: error.message });
    }
});

// Update a task
app.put('/tasks/:id', protect, async (req, res) => {
    try {
        const { title, completed } = req.body;
        
        const task = await Task.findOne({
            _id: req.params.id,
            user: req.userId
        });
        
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        
        if (title !== undefined) task.title = title;
        if (completed !== undefined) task.completed = completed;
        
        await task.save();
        res.json({
            message: 'Task updated successfully!',
            task
        });
    } catch (error) {
        if (error.name === 'CastError') {
            return res.status(400).json({ message: 'Invalid task ID' });
        }
        res.status(500).json({ message: error.message });
    }
});

// Delete a task
app.delete('/tasks/:id', protect, async (req, res) => {
    try {
        const task = await Task.findOneAndDelete({
            _id: req.params.id,
            user: req.userId
        });
        
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        
        res.json({
            message: 'Task deleted successfully!',
            task
        });
    } catch (error) {
        if (error.name === 'CastError') {
            return res.status(400).json({ message: 'Invalid task ID' });
        }
        res.status(500).json({ message: error.message });
    }
});

// ----- START SERVER -----
app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
    console.log('\n📌 Available routes:');
    console.log(`  POST   /auth/register  - Register a user`);
    console.log(`  POST   /auth/login     - Login and get token`);
    console.log(`  GET    /profile        - Get profile (Protected)`);
    console.log(`  GET    /tasks          - Get all tasks (Protected)`);
    console.log(`  GET    /tasks/:id      - Get one task (Protected)`);
    console.log(`  POST   /tasks          - Create a task (Protected)`);
    console.log(`  PUT    /tasks/:id      - Update a task (Protected)`);
    console.log(`  DELETE /tasks/:id      - Delete a task (Protected)`);
});