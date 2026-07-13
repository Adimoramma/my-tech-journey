// Load environment variables from .env file
require('dotenv').config();

// Access your connection string
const MONGO_URI = process.env.MONGO_URI;
const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET;