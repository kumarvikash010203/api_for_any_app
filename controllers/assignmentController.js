const Task = require('../models/Task');
const User = require('../models/User');
const Notification = require('../models/Notification');
const mongoose = require('mongoose');

// Assign a task to a user
exports.assignTask = async (req, res) => {
  try {
    const { taskId, assigneeId, message } = req.body;
    
    // Validate required fields
    if (!taskId || !assigneeId) {
      return res.status(400).json({ 
        success: false, 
        message: 'Task ID and assignee ID are required' 
      });
    }

    // Check if task exists
    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ 
        success: false, 
        message: 'Task not found' 
      });
    }

    // Check if user is the owner of the task
    if (task.user.toString() !== req.user.id) {
      return res.status(403).json({ 
        success: false, 
        message: 'You are not authorized to assign this task' 
      });
    }

    // Check if assignee exists
    const assignee = await User.findById(assigneeId);
    if (!assignee) {
      return res.status(404).json({ 
        success: false, 
        message: 'Assignee not found' 
      });
    }

    // Update task with assignment details
    task.assignedTo = assigneeId;
    task.assignedBy = req.user.id;
    task.assignmentStatus = 'pending';
    task.assignmentMessage = message || '';
    
    await task.save();

    // Create notification for the assignee
    const notification = new Notification({
      user: assigneeId,
      type: 'task_assigned',
      message: `${req.user.email} has assigned you a task: ${task.title}`,
      relatedTask: taskId,
      fromUser: req.user.id
    });

    await notification.save();

    // Return updated task with populated fields
    const updatedTask = await Task.findById(taskId)
      .populate('assignedTo', 'name email username')
      .populate('assignedBy', 'name email username')
      .populate('category', 'name color');

    return res.status(200).json({ 
      success: true, 
      message: 'Task assigned successfully', 
      task: updatedTask 
    });
  } catch (error) {
    console.error('Assign task error:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Server error, please try again later' 
    });
  }
};

// Get tasks assigned to the current user
exports.getTasksAssignedToMe = async (req, res) => {
  try {
    const tasks = await Task.find({ assignedTo: req.user.id })
      .populate('user', 'name email username')
      .populate('assignedBy', 'name email username')
      .populate('category', 'name color')
      .sort({ createdAt: -1 });

    return res.status(200).json(tasks);
  } catch (error) {
    console.error('Get assigned tasks error:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Server error, please try again later' 
    });
  }
};

// Get tasks assigned by the current user
exports.getTasksAssignedByMe = async (req, res) => {
  try {
    const tasks = await Task.find({ assignedBy: req.user.id })
      .populate('user', 'name email username')
      .populate('assignedTo', 'name email username')
      .populate('category', 'name color')
      .sort({ createdAt: -1 });

    return res.status(200).json(tasks);
  } catch (error) {
    console.error('Get tasks assigned by me error:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Server error, please try again later' 
    });
  }
};

// Update task assignment status
exports.updateAssignmentStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, message } = req.body;
    
    // Validate status
    const validStatuses = ['accepted', 'rejected', 'completed'];
    if (!status || !validStatuses.includes(status)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Valid status (accepted, rejected, or completed) is required' 
      });
    }

    // Check if task exists
    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({ 
        success: false, 
        message: 'Task not found' 
      });
    }

    // Check if user is the assignee of the task
    if (task.assignedTo.toString() !== req.user.id) {
      return res.status(403).json({ 
        success: false, 
        message: 'You are not authorized to update this assignment status' 
      });
    }

    // Update task status
    task.assignmentStatus = status;
    if (status === 'completed') {
      task.completed = true;
    }
    
    await task.save();

    // Create notification for the task owner
    const notificationType = 
      status === 'accepted' ? 'assignment_accepted' :
      status === 'rejected' ? 'assignment_rejected' : 'task_completed';
    
    const notificationMessage = 
      status === 'accepted' ? `${req.user.email} has accepted your task: ${task.title}` :
      status === 'rejected' ? `${req.user.email} has rejected your task: ${task.title}` :
      `${req.user.email} has completed your task: ${task.title}`;

    const notification = new Notification({
      user: task.user,
      type: notificationType,
      message: notificationMessage,
      relatedTask: id,
      fromUser: req.user.id
    });

    await notification.save();

    // Return updated task with populated fields
    const updatedTask = await Task.findById(id)
      .populate('user', 'name email username')
      .populate('assignedTo', 'name email username')
      .populate('assignedBy', 'name email username')
      .populate('category', 'name color');

    return res.status(200).json({ 
      success: true, 
      message: `Assignment status updated to ${status}`, 
      task: updatedTask 
    });
  } catch (error) {
    console.error('Update assignment status error:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Server error, please try again later' 
    });
  }
}; 