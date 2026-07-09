// Day 16: Route Parameters

// Load Express
const express = require('express');

// Create Express app
const app = express();

// Define port
const port = 3000;

// ----- STATIC ROUTES (from Day 15) -----

// Homepage
app.get('/', (req, res) => {
    res.send('Welcome to my Node.js server! 🚀');
});

// About page
app.get('/about', (req, res) => {
    res.send('This is the About page. I am learning Node.js!');
});

// API route
app.get('/api', (req, res) => {
    res.json({
        name: 'Michael',
        age: 27,
        country: 'Nigeria',
        skills: ['HTML', 'CSS', 'JavaScript', 'Node.js']
    });
});

// Products route
app.get('/products', (req, res) => {
    const products = [
        { id: 1, name: 'Laptop', price: 1000 },
        { id: 2, name: 'Phone', price: 500 },
        { id: 3, name: 'Headphones', price: 100 }
    ];
    res.json(products);
});

// ----- ROUTE PARAMETERS (NEW) -----

// Route 1: User profile with parameter
// Go to: http://localhost:3000/user/1
// Go to: http://localhost:3000/user/2
// Go to: http://localhost:3000/user/3
app.get('/user/:id', (req, res) => {
    const userId = req.params.id;
    res.send(`You requested user with ID: ${userId}`);
});

// Route 2: Product detail with parameter
// Go to: http://localhost:3000/product/1
// Go to: http://localhost:3000/product/2
// Go to: http://localhost:3000/product/3
app.get('/product/:id', (req, res) => {
    const productId = parseInt(req.params.id);
    
    const products = [
        { id: 1, name: 'Laptop', price: 1000 },
        { id: 2, name: 'Phone', price: 500 },
        { id: 3, name: 'Headphones', price: 100 }
    ];
    
    const product = products.find(p => p.id === productId);
    
    if (product) {
        res.json({
            message: 'Product found!',
            product: product
        });
    } else {
        res.status(404).json({
            message: 'Product not found',
            id: productId
        });
    }
});

// Route 3: Multiple parameters
// Go to: http://localhost:3000/category/electronics/product/5
app.get('/category/:categoryName/product/:productId', (req, res) => {
    const category = req.params.categoryName;
    const productId = req.params.productId;
    res.send(`Category: ${category}, Product ID: ${productId}`);
});

// Route 4: User with ID and post with ID
// Go to: http://localhost:3000/users/5/posts/12
app.get('/users/:userId/posts/:postId', (req, res) => {
    const userId = req.params.userId;
    const postId = req.params.postId;
    res.json({
        user: userId,
        post: postId,
        message: `User ${userId} - Post ${postId}`
    });
});

// Route 5: Search with query parameter (Bonus)
// Go to: http://localhost:3000/search?q=javascript
app.get('/search', (req, res) => {
    const query = req.query.q;
    if (query) {
        res.send(`You searched for: ${query}`);
    } else {
        res.send('Please provide a search query: ?q=javascript');
    }
});

// ----- START SERVER -----
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
    console.log('Try these routes:');
    console.log(`  http://localhost:${port}/user/1`);
    console.log(`  http://localhost:${port}/user/2`);
    console.log(`  http://localhost:${port}/product/1`);
    console.log(`  http://localhost:${port}/product/5`);
    console.log(`  http://localhost:${port}/category/electronics/product/5`);
    console.log(`  http://localhost:${port}/users/5/posts/12`);
    console.log(`  http://localhost:${port}/search?q=javascript`);
    console.log('Press Ctrl+C to stop the server');
});