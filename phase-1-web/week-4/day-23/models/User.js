// models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true,
        minlength: [2, 'Name must be at least 2 characters long']
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
        minlength: [6, 'Password must be at least 6 characters long']
    },
    country: {
        type: String,
        enum: ['Nigeria', 'USA', 'UK', 'Canada', 'Germany', 'Other'],
        default: 'Other'
    },
    skills: {
        type: [String],
        default: []
    },
    isActive: {
        type: Boolean,
        default: true
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    }
}, {
    timestamps: true
});

// ----- HASH PASSWORD BEFORE SAVING -----
userSchema.pre('save', async function(next) {
    // Only hash if password is modified (or new)
    if (!this.isModified('password')) return next();
    
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

// ----- INSTANCE METHOD: Compare password -----
userSchema.methods.comparePassword = async function(candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

// ----- STATIC METHOD: Find user by email -----
userSchema.statics.findByEmail = function(email) {
    return this.findOne({ email: email });
};

module.exports = mongoose.model('User', userSchema);