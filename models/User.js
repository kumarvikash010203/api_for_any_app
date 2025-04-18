const mongoose = require('mongoose');

// Define User Schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  phone_number: {
    type: String,
    default: null
  },
  username: {
    type: String,
    unique: true,
    sparse: true, // Allow multiple null values (if username is optional)
    trim: true
  },
  profile_picture: {
    type: String,
    default: null
  },
  date_of_birth: {
    type: Date,
    default: null
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'other', null],
    default: null
  },
  address: {
    type: String,
    default: null
  },
  referral_code: {
    type: String,
    default: null
  },
  user_role: {
    type: String,
    enum: ['admin', 'user', 'vendor'],
    default: 'user'
  }
}, { timestamps: true }); // Use timestamps option to automatically handle createdAt and updatedAt

// Create and export User model
const User = mongoose.model('User', userSchema);
module.exports = User; 