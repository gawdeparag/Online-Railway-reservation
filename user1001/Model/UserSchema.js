const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSch = new mongoose.Schema({

    name: {
        type: String,
        required: [true, 'Enter full name']
    },

    Age: { type: Number },

    Email: {
        type: String,
        required: [true, 'Enter your email'],
        unique: true,
        lowercase: true
    },

    password: {
        type: String,
        required: [true, 'Please enter a password'],
        minlength: [6, 'Minimum password length is 6 characters']
    },

    Mobileno: { type: Number }
});


module.exports = mongoose.model('Passenger', userSch);