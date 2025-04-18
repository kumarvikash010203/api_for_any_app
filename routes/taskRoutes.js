const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const { authMiddleware } = require('../middleware/authMiddleware');

// Apply authentication middleware to all routes
router.use(authMiddleware);

// Task management routes
router.get('/', taskController.getAllTasks);
router.post('/', taskController.createTask);
router.put('/:id', taskController.updateTask);
router.delete('/:id', taskController.deleteTask);
router.get('/completed', taskController.getCompletedTasks);

// Calendar-related routes
router.get('/date/:date', taskController.getTasksByDate);
router.get('/range/:startDate/:endDate', taskController.getTasksByDateRange);

module.exports = router; 