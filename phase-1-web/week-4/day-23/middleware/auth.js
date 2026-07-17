// middleware/auth.js
const jwt = require('jsonwebtoken');

// Middleware to protect routes
const protect = async (req, res, next) => {
    try {
        // Get token from Authorization header
        const authHeader = req.headers.authorization;
        
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({
                message: 'Not authorized. No token provided.'
            });
        }
        
        // Extract token (remove "Bearer " prefix)
        const token = authHeader.split(' ')[1];
        
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Attach user ID to request
        req.userId = decoded.userId;
        req.userRole = decoded.role;
        
        next();
    } catch (error) {
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({
                message: 'Invalid token. Please login again.'
            });
        }
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({
                message: 'Token expired. Please login again.'
            });
        }
        res.status(500).json({ message: error.message });
    }
};

// Middleware to check if user is admin
const adminOnly = (req, res, next) => {
    if (req.userRole !== 'admin') {
        return res.status(403).json({
            message: 'Access denied. Admin only.'
        });
    }
    next();
};

module.exports = { protect, adminOnly };