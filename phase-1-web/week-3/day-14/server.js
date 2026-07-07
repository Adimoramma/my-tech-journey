// Day 14: NPM & Express Setup

// Load the Express library
const express = require('express');

// Create an Express application
const app = express();

// Define the port number
const port = 3000;

// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
    console.log('Press Ctrl+C to stop the server');
});

// Test route: go to http://localhost:3000/ in your browser
// We will add routes in Day 15