const Category = require('../models/Category');
const Task = require('../models/Task');

// Get all categories for a user
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find({ user: req.user.id })
      .sort({ name: 1 });
    
    res.status(200).json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Create a new category
exports.createCategory = async (req, res) => {
  try {
    const { name, color } = req.body;
    
    // Check if category already exists for this user
    const existingCategory = await Category.findOne({ 
      name, 
      user: req.user.id 
    });
    
    if (existingCategory) {
      return res.status(400).json({ message: 'Category already exists' });
    }
    
    const newCategory = new Category({
      name,
      color,
      user: req.user.id
    });
    
    const savedCategory = await newCategory.save();
    
    res.status(201).json(savedCategory);
  } catch (error) {
    console.error('Error creating category:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update a category
exports.updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, color } = req.body;
    
    const category = await Category.findById(id);
    
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    
    // Check if the category belongs to the user
    if (category.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }
    
    // Check if a category with the new name already exists
    if (name !== category.name) {
      const existingCategory = await Category.findOne({ 
        name, 
        user: req.user.id,
        _id: { $ne: id }
      });
      
      if (existingCategory) {
        return res.status(400).json({ message: 'Category name already exists' });
      }
    }
    
    const updatedCategory = await Category.findByIdAndUpdate(
      id,
      { name, color },
      { new: true }
    );
    
    res.status(200).json(updatedCategory);
  } catch (error) {
    console.error('Error updating category:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete a category
exports.deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    
    const category = await Category.findById(id);
    
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    
    // Check if the category belongs to the user
    if (category.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }
    
    // Check if there are tasks using this category
    const tasksWithCategory = await Task.countDocuments({ category: id });
    
    if (tasksWithCategory > 0) {
      // Option 1: Don't allow deletion
      // return res.status(400).json({ 
      //   message: 'Cannot delete category in use by tasks',
      //   tasksCount: tasksWithCategory
      // });
      
      // Option 2: Remove category from all tasks
      await Task.updateMany(
        { category: id },
        { $unset: { category: 1 } }
      );
    }
    
    await Category.findByIdAndDelete(id);
    
    res.status(200).json({ message: 'Category deleted successfully' });
  } catch (error) {
    console.error('Error deleting category:', error);
    res.status(500).json({ message: 'Server error' });
  }
}; 