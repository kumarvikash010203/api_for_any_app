const bcrypt = require('bcrypt');
const User = require('../models/User');
const { signupSchema, updateProfileSchema } = require('../validators/userValidators');

// User signup controller
exports.signup = async (req, res) => {
  try {
    // Validate request body
    const { error, value } = signupSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ 
        success: false, 
        message: error.details[0].message 
      });
    }

    const { 
      fullName, 
      email, 
      password,
      phoneNumber, 
      username, 
      dateOfBirth, 
      gender, 
      address, 
      referralCode, 
      userRole,
      role
    } = value;

    // Check if email already exists
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ 
        success: false, 
        message: 'An account with this email already exists' 
      });
    }

    // Check if username exists if provided
    if (username) {
      const existingUsername = await User.findOne({ username });
      if (existingUsername) {
        return res.status(400).json({
          success: false,
          message: 'This username is already in use'
        });
      }
    }

    // Hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Get profile picture path if uploaded
    const profilePicture = req.file ? req.file.path : null;

    // Create new user
    const newUser = new User({
      name: fullName,
      email,
      password: hashedPassword,
      phone_number: phoneNumber || null,
      username: username || null,
      profile_picture: profilePicture,
      date_of_birth: dateOfBirth || null,
      gender: gender || null,
      address: address || null,
      referral_code: referralCode || null,
      user_role: userRole || role || 'user'
    });

    // Save user to database
    await newUser.save();

    // Return success response
    return res.status(201).json({
      success: true,
      message: 'Signup successful!',
      userId: newUser._id
    });
  } catch (error) {
    console.error('Signup error:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Server error, please try again later' 
    });
  }
};

// User login controller
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate required fields
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required'
      });
    }

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Compare password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Generate JWT token
    const jwt = require('jsonwebtoken');
    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.user_role },
      process.env.JWT_SECRET || 'your_jwt_secret_key_here',
      { expiresIn: '7d' }
    );

    // Return user data with token
    return res.status(200).json({
      success: true,
      message: 'Login successful',
      token: token,
      user: {
        id: user._id,
        fullName: user.name,
        email: user.email,
        role: user.user_role
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error, please try again later'
    });
  }
};

// Get user profile controller
exports.getUserProfile = async (req, res) => {
  try {
    const userId = req.params.id;
    
    // Get user profile
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Return user profile
    return res.status(200).json({
      success: true,
      user: {
        id: user._id,
        fullName: user.name,
        email: user.email,
        phoneNumber: user.phone_number,
        username: user.username,
        profilePicture: user.profile_picture,
        dateOfBirth: user.date_of_birth,
        gender: user.gender,
        address: user.address,
        userRole: user.user_role,
        createdAt: user.createdAt
      }
    });
  } catch (error) {
    console.error('Get profile error:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error, please try again later'
    });
  }
};

// Update user profile controller
exports.updateProfile = async (req, res) => {
  try {
    const userId = req.params.id;
    
    // Validate request body
    const { error, value } = updateProfileSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ 
        success: false, 
        message: error.details[0].message 
      });
    }

    // Get fields to update
    const {
      fullName,
      phoneNumber,
      username,
      dateOfBirth,
      gender,
      address
    } = value;

    // Check if user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // If username is being updated, check if it's already taken
    if (username && username !== user.username) {
      const existingUsername = await User.findOne({ username });
      if (existingUsername) {
        return res.status(400).json({
          success: false,
          message: 'This username is already in use'
        });
      }
    }

    // Build update object
    const updateData = {};
    if (fullName) updateData.name = fullName;
    if (phoneNumber !== undefined) updateData.phone_number = phoneNumber || null;
    if (username !== undefined) updateData.username = username || null;
    if (dateOfBirth !== undefined) updateData.date_of_birth = dateOfBirth || null;
    if (gender !== undefined) updateData.gender = gender || null;
    if (address !== undefined) updateData.address = address || null;
    
    // Handle profile picture if uploaded
    if (req.file) {
      updateData.profile_picture = req.file.path;
    }

    // Update user profile
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      updateData,
      { new: true } // Return the updated document
    );

    // Return updated profile
    return res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      user: {
        id: updatedUser._id,
        fullName: updatedUser.name,
        email: updatedUser.email,
        phoneNumber: updatedUser.phone_number,
        username: updatedUser.username,
        profilePicture: updatedUser.profile_picture,
        dateOfBirth: updatedUser.date_of_birth,
        gender: updatedUser.gender,
        address: updatedUser.address,
        userRole: updatedUser.user_role,
        createdAt: updatedUser.createdAt
      }
    });
  } catch (error) {
    console.error('Update profile error:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error, please try again later'
    });
  }
}; 