const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');
const { authMiddleware } = require('../middleware/authMiddleware');

// Apply authentication middleware to all routes
router.use(authMiddleware);

// Notification routes
router.get('/', notificationController.getNotifications);
router.put('/:id/mark-read', notificationController.markNotificationAsRead);
router.put('/mark-all-read', notificationController.markAllNotificationsAsRead);
router.get('/unread-count', notificationController.getUnreadCount);

module.exports = router; 