const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    userType: {
        type: Boolean,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: [true, 'Enter your email'],
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: [true, 'Please enter a password'],
        minlength: [6, 'Minimum 6 characters required']
    },
    mobileNo: {
        type: Number,
        required: true,
        minlength: [10, 'Minimum 10 digits required']
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    lastLoggedIn: {
        type: Date
    }
});

module.exports = mongoose.model('users', UserSchema);