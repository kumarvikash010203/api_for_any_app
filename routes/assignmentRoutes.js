const express = require('express');
const router = express.Router();
const assignmentController = require('../controllers/assignmentController');
const { authMiddleware } = require('../middleware/authMiddleware');

// Apply authentication middleware to all routes
router.use(authMiddleware);

// Assignment routes
router.post('/assign', assignmentController.assignTask);
router.get('/assigned-to-me', assignmentController.getTasksAssignedToMe);
router.get('/assigned-by-me', assignmentController.getTasksAssignedByMe);
router.put('/:id/status', assignmentController.updateAssignmentStatus);

module.exports = router; 