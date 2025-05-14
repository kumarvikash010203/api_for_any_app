const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { authMiddleware } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

// Public routes
router.post('/signup', userController.signup);
router.post('/login', userController.login);

// Protected routes
router.use(authMiddleware);
router.get('/search', userController.searchUsers);
router.get('/profile/:id', userController.getUserProfile);
router.put('/profile/:id', upload.single('profilePicture'), userController.updateProfile);

module.exports = router; 