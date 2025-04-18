const Task = require('../models/Task');

// Get all tasks for a user
exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id })
      .populate('category', 'name color')
      .sort({ createdAt: -1 });
    
    res.status(200).json(tasks);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Create a new task
exports.createTask = async (req, res) => {
  try {
    const { title, description, dueDate, category, completed } = req.body;
    
    const newTask = new Task({
      title,
      description,
      dueDate,
      category,
      completed: completed || false,
      user: req.user.id
    });
    
    const savedTask = await newTask.save();
    await savedTask.populate('category', 'name color');
    
    res.status(201).json(savedTask);
  } catch (error) {
    console.error('Error creating task:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update a task
exports.updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, dueDate, category, completed } = req.body;
    
    const task = await Task.findById(id);
    
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    
    // Check if the task belongs to the user
    if (task.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }
    
    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { title, description, dueDate, category, completed },
      { new: true }
    ).populate('category', 'name color');
    
    res.status(200).json(updatedTask);
  } catch (error) {
    console.error('Error updating task:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete a task
exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    
    const task = await Task.findById(id);
    
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    
    // Check if the task belongs to the user
    if (task.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }
    
    await Task.findByIdAndDelete(id);
    
    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error('Error deleting task:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get completed tasks
exports.getCompletedTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ 
      user: req.user.id,
      completed: true 
    })
    .populate('category', 'name color')
    .sort({ createdAt: -1 });
    
    res.status(200).json(tasks);
  } catch (error) {
    console.error('Error fetching completed tasks:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get tasks for a specific date
exports.getTasksByDate = async (req, res) => {
  try {
    const { date } = req.params;
    
    // Create a date range for the specified date (start to end of the day)
    const startDate = new Date(date);
    startDate.setHours(0, 0, 0, 0);
    
    const endDate = new Date(date);
    endDate.setHours(23, 59, 59, 999);
    
    const tasks = await Task.find({
      user: req.user.id,
      dueDate: { $gte: startDate, $lte: endDate }
    })
    .populate('category', 'name color')
    .sort({ createdAt: -1 });
    
    res.status(200).json(tasks);
  } catch (error) {
    console.error('Error fetching tasks by date:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get tasks within a date range
exports.getTasksByDateRange = async (req, res) => {
  try {
    const { startDate, endDate } = req.params;
    
    // Create a date range
    const start = new Date(startDate);
    start.setHours(0, 0, 0, 0);
    
    const end = new Date(endDate);
    end.setHours(23, 59, 59, 999);
    
    const tasks = await Task.find({
      user: req.user.id,
      dueDate: { $gte: start, $lte: end }
    })
    .populate('category', 'name color')
    .sort({ dueDate: 1 });
    
    res.status(200).json(tasks);
  } catch (error) {
    console.error('Error fetching tasks by date range:', error);
    res.status(500).json({ message: 'Server error' });
  }
}; 