const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const upload = require('../middleware/uploadMiddleware');

// User signup route
router.post('/signup', upload.single('profilePicture'), userController.signup);

// Login route (for future use)
router.post('/login', userController.login);

// Get user profile (for future use)
router.get('/profile/:id', userController.getUserProfile);

// Update user profile
router.put('/profile/:id', upload.single('profilePicture'), userController.updateProfile);

module.exports = router; 