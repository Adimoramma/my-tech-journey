// server.js
// Day 20: Mongoose & Connecting to MongoDB

// Load environment variables
require('dotenv').config();

// Load Express
const express = require('express');

// Load Mongoose
const mongoose = require('mongoose');

// Load the Task model
const Task = require('./models/Task');

// Create Express app
const app = express();

// ----- MIDDLEWARE -----
app.use(express.json());

// ----- CONNECT TO MONGODB -----
const MONGO_URI = process.env.MONGO_URI;
const PORT = process.env.PORT || 3000;

mongoose.connect(MONGO_URI)
    .then(() => {
        console.log('✅ Connected to MongoDB successfully!');
        console.log(`📊 Database: ${mongoose.connection.name}`);
    })
    .catch((error) => {
        console.error('❌ Failed to connect to MongoDB:', error.message);
        console.log('💡 Make sure you have created a .env file with MONGO_URI');
        process.exit(1); // Stop the server if connection fails
    });

// ----- GET ROUTES -----

// Homepage
app.get('/', (req, res) => {
    res.send(`
        <h1>📝 Task API with MongoDB</h1>
        <p>Connected to MongoDB: ${mongoose.connection.readyState === 1 ? '✅ Connected' : '❌ Not connected'}</p>
        <p>Available routes:</p>
        <ul>
            <li><strong>GET</strong> /tasks - Get all tasks</li>
            <li><strong>GET</strong> /tasks/:id - Get a single task</li>
            <li><strong>POST</strong> /tasks - Create a new task</li>
            <li><strong>PUT</strong> /tasks/:id - Update a task</li>
            <li><strong>DELETE</strong> /tasks/:id - Delete a task</li>
        </ul>
    `);
});

// GET all tasks
app.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET a single task by ID
app.get('/tasks/:id', async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.json(task);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// ----- POST ROUTES -----

// Create a new task
app.post('/tasks', async (req, res) => {
    try {
        const { title, completed } = req.body;
        
        // Validate: title is required
        if (!title) {
            return res.status(400).json({ message: 'Title is required!' });
        }
        
        // Create a new task using the Task model
        const newTask = new Task({
            title: title,
            completed: completed || false
        });
        
        // Save to MongoDB
        const savedTask = await newTask.save();
        
        res.status(201).json({
            message: 'Task created successfully!',
            task: savedTask
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// ----- PUT ROUTES -----

// Update a task by ID
app.put('/tasks/:id', async (req, res) => {
    try {
        const { title, completed } = req.body;
        
        // Find and update the task
        const updatedTask = await Task.findByIdAndUpdate(
            req.params.id,
            { title, completed },
            { new: true, runValidators: true }
        );
        
        if (!updatedTask) {
            return res.status(404).json({ message: 'Task not found' });
        }
        
        res.json({
            message: 'Task updated successfully!',
            task: updatedTask
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// ----- DELETE ROUTES -----

// Delete a task by ID
app.delete('/tasks/:id', async (req, res) => {
    try {
        const deletedTask = await Task.findByIdAndDelete(req.params.id);
        
        if (!deletedTask) {
            return res.status(404).json({ message: 'Task not found' });
        }
        
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// ----- START SERVER -----
app.listen(PORT, () => {
    console.log(`🚀 Server is running at http://localhost:${PORT}`);
    console.log(`📊 MongoDB Status: ${mongoose.connection.readyState === 1 ? '✅ Connected' : '❌ Not connected'}`);
    console.log('\n📌 Available routes:');
    console.log(`  GET    /tasks           - Get all tasks`);
    console.log(`  GET    /tasks/:id       - Get a single task`);
    console.log(`  POST   /tasks           - Create a new task`);
    console.log(`  PUT    /tasks/:id       - Update a task`);
    console.log(`  DELETE /tasks/:id       - Delete a task`);
});