// models/User.js
const mongoose = require('mongoose');

// Define the User schema
const userSchema = new mongoose.Schema({
    // ----- BASIC INFO -----
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true,
        minlength: [2, 'Name must be at least 2 characters long'],
        maxlength: [50, 'Name cannot exceed 50 characters']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        trim: true,
        lowercase: true,
        match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address']
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [8, 'Password must be at least 8 characters long']
    },
    
    // ----- PROFILE INFO -----
    age: {
        type: Number,
        min: [13, 'You must be at least 13 years old'],
        max: [120, 'Please enter a valid age']
    },
    country: {
        type: String,
        enum: ['Nigeria', 'USA', 'UK', 'Canada', 'Germany', 'Other'],
        default: 'Other'
    },
    bio: {
        type: String,
        maxlength: [500, 'Bio cannot exceed 500 characters']
    },
    
    // ----- SKILLS (Array) -----
    skills: {
        type: [String],
        default: []
    },
    
    // ----- STATUS -----
    isActive: {
        type: Boolean,
        default: true
    },
    role: {
        type: String,
        enum: ['user', 'admin', 'moderator'],
        default: 'user'
    },
    
    // ----- TIMESTAMPS -----
    lastLogin: {
        type: Date,
        default: Date.now
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {
    // Options
    timestamps: true // Automatically adds createdAt and updatedAt
});

// ----- VIRTUAL PROPERTIES -----
// Virtual property (not stored in database)
userSchema.virtual('fullName').get(function() {
    return this.name;
});

// ----- SCHEMA METHODS -----
// Instance method: available on document instances
userSchema.methods.greet = function() {
    return `Hello, my name is ${this.name}!`;
};

userSchema.methods.hasSkill = function(skill) {
    return this.skills.includes(skill);
};

// ----- SCHEMA STATICS -----
// Static method: available on the model
userSchema.statics.findByEmail = function(email) {
    return this.findOne({ email: email });
};

userSchema.statics.findActiveUsers = function() {
    return this.find({ isActive: true });
};

// ----- MIDDLEWARE (Pre-save hook) -----
userSchema.pre('save', function(next) {
    console.log(`📝 Saving user: ${this.name}`);
    // You could hash the password here
    next();
});

// ----- EXPORT MODEL -----
module.exports = mongoose.model('User', userSchema);