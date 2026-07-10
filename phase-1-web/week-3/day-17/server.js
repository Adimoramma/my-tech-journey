// Day 17: POST Requests & Body Parsing

// Load Express
const express = require('express');

// Create Express app
const app = express();

// ----- MIDDLEWARE -----
// This is IMPORTANT! It allows Express to read JSON data from POST requests
app.use(express.json());

// Define port
const port = 3000;

// ----- STORAGE (In-memory array) -----
let tasks = [
    { id: 1, title: 'Learn Node.js', completed: false },
    { id: 2, title: 'Build a server', completed: false }
];
let nextId = 3;

// ----- GET ROUTES -----

// Homepage
app.get('/', (req, res) => {
    res.send('Welcome to my Node.js server with POST routes! 🚀');
});

// Get all tasks
// Go to: http://localhost:3000/tasks
app.get('/tasks', (req, res) => {
    res.json(tasks);
});

// Get a single task by ID
// Go to: http://localhost:3000/tasks/1
app.get('/tasks/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const task = tasks.find(t => t.id === id);
    
    if (task) {
        res.json(task);
    } else {
        res.status(404).json({ message: 'Task not found' });
    }
});

// ----- POST ROUTES -----

// Route 1: Create a new task
// Send POST request to: http://localhost:3000/tasks
// Body: { "title": "Buy groceries", "completed": false }
app.post('/tasks', (req, res) => {
    // Get the data from the request body
    const { title, completed } = req.body;
    
    // Validate: title is required
    if (!title) {
        return res.status(400).json({
            message: 'Title is required! Please provide a title.'
        });
    }
    
    // Create a new task object
    const newTask = {
        id: nextId++,
        title: title,
        completed: completed || false // if not provided, default to false
    };
    
    // Add it to our array
    tasks.push(newTask);
    
    // Send back the created task with 201 status (Created)
    res.status(201).json({
        message: 'Task created successfully!',
        task: newTask
    });
});

// Route 2: Simple echo route (returns whatever you send)
// Send POST request to: http://localhost:3000/echo
// Body: { "anything": "you want" }
app.post('/echo', (req, res) => {
    res.json({
        message: 'Here is what you sent me:',
        data: req.body
    });
});

// Route 3: Contact form endpoint
// Send POST request to: http://localhost:3000/contact
// Body: { "name": "John", "email": "john@email.com", "message": "Hello!" }
app.post('/contact', (req, res) => {
    const { name, email, message } = req.body;
    
    // Validate: all fields are required
    if (!name || !email || !message) {
        return res.status(400).json({
            message: 'All fields (name, email, message) are required!'
        });
    }
    
    // In a real app, you would save this to a database or send an email
    console.log('📧 New contact message:');
    console.log(`  Name: ${name}`);
    console.log(`  Email: ${email}`);
    console.log(`  Message: ${message}`);
    console.log('------------------------');
    
    res.status(201).json({
        message: 'Thank you for your message! I will get back to you soon.',
        received: { name, email, message }
    });
});

// ----- START SERVER -----
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
    console.log('\n📌 Available GET routes:');
    console.log(`  GET  /tasks - Get all tasks`);
    console.log(`  GET  /tasks/:id - Get a single task`);
    console.log('\n📌 Available POST routes:');
    console.log(`  POST /tasks - Create a new task`);
    console.log(`  POST /echo - Echo back any JSON data`);
    console.log(`  POST /contact - Send a contact message`);
    console.log('\n⚠️  Use Postman or curl to test POST routes');
    console.log('Press Ctrl+C to stop the server');
});