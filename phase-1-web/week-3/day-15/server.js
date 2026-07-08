// Day 15: GET Routes

// Load Express
const express = require('express');

// Create Express app
const app = express();

// Define port
const port = 3000;

// ----- GET ROUTES -----

// Route 1: Homepage
// Go to: http://localhost:3000/
app.get('/', (req, res) => {
    res.send('Welcome to my Node.js server! 🚀');
});

// Route 2: About page
// Go to: http://localhost:3000/about
app.get('/about', (req, res) => {
    res.send('This is the About page. I am learning Node.js!');
});

// Route 3: JSON response
// Go to: http://localhost:3000/api
app.get('/api', (req, res) => {
    res.json({
        name: 'Michael',
        age: 27,
        country: 'Nigeria',
        skills: ['HTML', 'CSS', 'JavaScript', 'Node.js']
    });
});

// Route 4: Products page with array
// Go to: http://localhost:3000/products
app.get('/products', (req, res) => {
    const products = [
        { id: 1, name: 'Laptop', price: 1000 },
        { id: 2, name: 'Phone', price: 500 },
        { id: 3, name: 'Headphones', price: 100 }
    ];
    res.json(products);
});

// Route 5: HTML response
// Go to: http://localhost:3000/html
app.get('/html', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html>
        <head><title>My HTML Page</title></head>
        <body>
            <h1 style="color: #3498db;">Hello from Node.js!</h1>
            <p>This HTML is being sent from my server.</p>
            <ul>
                <li>Route 1: / - Homepage</li>
                <li>Route 2: /about - About page</li>
                <li>Route 3: /api - JSON response</li>
                <li>Route 4: /products - Products list</li>
                <li>Route 5: /html - HTML page</li>
            </ul>
        </body>
        </html>
    `);
});

// ----- START SERVER -----
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
    console.log('Try these routes:');
    console.log(`  http://localhost:${port}/`);
    console.log(`  http://localhost:${port}/about`);
    console.log(`  http://localhost:${port}/api`);
    console.log(`  http://localhost:${port}/products`);
    console.log(`  http://localhost:${port}/html`);
    console.log('Press Ctrl+C to stop the server');
});