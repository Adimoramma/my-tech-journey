// =============================================
// DAY 18: WEEKLY PROJECT - Books CRUD API
// =============================================

// Load Express
const express = require('express');

// Create Express app
const app = express();

// ----- MIDDLEWARE -----
// This allows Express to read JSON data from POST and PUT requests
app.use(express.json());

// Define port
const port = 3000;

// ----- DATA STORAGE (In-memory array) -----
let books = [
    { id: 1, title: '1984', author: 'George Orwell' },
    { id: 2, title: 'Brave New World', author: 'Aldous Huxley' },
    { id: 3, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald' }
];
let nextId = 4;

// ----- HOME ROUTE -----
app.get('/', (req, res) => {
    res.send(`
        <h1>📚 Books API</h1>
        <p>Welcome to the Books API! Here are the available routes:</p>
        <ul>
            <li><strong>GET</strong> /books - Get all books</li>
            <li><strong>GET</strong> /books/:id - Get a single book</li>
            <li><strong>POST</strong> /books - Add a new book</li>
            <li><strong>PUT</strong> /books/:id - Update a book</li>
            <li><strong>DELETE</strong> /books/:id - Delete a book</li>
        </ul>
        <p>📖 Use Postman or curl to test the API.</p>
    `);
});

// =============================================
// 1. CREATE - POST /books
// =============================================
// Add a new book
// Request body: { "title": "Book Title", "author": "Author Name" }
app.post('/books', (req, res) => {
    // Get the data from the request body
    const { title, author } = req.body;
    
    // Validate: both title and author are required
    if (!title || !author) {
        return res.status(400).json({
            message: 'Both title and author are required!'
        });
    }
    
    // Create a new book object
    const newBook = {
        id: nextId++,
        title: title,
        author: author
    };
    
    // Add it to our array
    books.push(newBook);
    
    // Send back the created book with 201 status (Created)
    res.status(201).json({
        message: 'Book added successfully!',
        book: newBook
    });
});

// =============================================
// 2. READ (All) - GET /books
// =============================================
// Get all books
app.get('/books', (req, res) => {
    res.json(books);
});

// =============================================
// 3. READ (One) - GET /books/:id
// =============================================
// Get a single book by ID
app.get('/books/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const book = books.find(b => b.id === id);
    
    if (book) {
        res.json(book);
    } else {
        res.status(404).json({
            message: `Book with ID ${id} not found`
        });
    }
});

// =============================================
// 4. UPDATE - PUT /books/:id
// =============================================
// Update a book by ID
// Request body: { "title": "New Title", "author": "New Author" }
app.put('/books/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { title, author } = req.body;
    
    // Find the book
    const bookIndex = books.findIndex(b => b.id === id);
    
    if (bookIndex === -1) {
        return res.status(404).json({
            message: `Book with ID ${id} not found`
        });
    }
    
    // Update the book (only update fields that are provided)
    if (title) {
        books[bookIndex].title = title;
    }
    if (author) {
        books[bookIndex].author = author;
    }
    
    // Send back the updated book
    res.json({
        message: 'Book updated successfully!',
        book: books[bookIndex]
    });
});

// =============================================
// 5. DELETE - DELETE /books/:id
// =============================================
// Delete a book by ID
app.delete('/books/:id', (req, res) => {
    const id = parseInt(req.params.id);
    
    // Find the book
    const bookIndex = books.findIndex(b => b.id === id);
    
    if (bookIndex === -1) {
        return res.status(404).json({
            message: `Book with ID ${id} not found`
        });
    }
    
    // Remove the book from the array
    const deletedBook = books[bookIndex];
    books.splice(bookIndex, 1);
    
    // Send back 204 No Content (success, no response body)
    res.status(204).send();
});

// =============================================
// START SERVER
// =============================================
app.listen(port, () => {
    console.log(`📚 Books API is running at http://localhost:${port}`);
    console.log('\n📌 Available routes:');
    console.log(`  GET    /books           - Get all books`);
    console.log(`  GET    /books/:id       - Get a single book`);
    console.log(`  POST   /books           - Add a new book`);
    console.log(`  PUT    /books/:id       - Update a book`);
    console.log(`  DELETE /books/:id       - Delete a book`);
    console.log('\n📖 Sample book data:');
    console.log(JSON.stringify(books, null, 2));
    console.log('\n⚠️  Press Ctrl+C to stop the server');
});