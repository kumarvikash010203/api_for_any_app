const Joi = require('joi');

// Validation schema for user signup
const signupSchema = Joi.object({
  fullName: Joi.string().required().min(3).max(100).messages({
    'string.empty': 'Name is required',
    'string.min': 'Name must be at least 3 characters',
    'string.max': 'Name must not exceed 100 characters'
  }),
  
  email: Joi.string().email().required().messages({
    'string.empty': 'Email is required',
    'string.email': 'Please enter a valid email'
  }),
  
  password: Joi.string().required().min(6).max(30).messages({
    'string.empty': 'Password is required',
    'string.min': 'Password must be at least 6 characters',
    'string.max': 'Password must not exceed 30 characters'
  }),
  
  confirmPassword: Joi.string().valid(Joi.ref('password')).messages({
    'any.only': 'Passwords do not match'
  }),
  
  phoneNumber: Joi.string().allow('').pattern(/^[0-9]{10}$/).messages({
    'string.pattern.base': 'Phone number must be 10 digits'
  }),
  
  username: Joi.string().allow('').min(3).max(50).messages({
    'string.min': 'Username must be at least 3 characters',
    'string.max': 'Username must not exceed 50 characters'
  }),
  
  dateOfBirth: Joi.date().allow('').max('now').messages({
    'date.max': 'Date of birth must be in the past'
  }),
  
  gender: Joi.string().allow('').valid('male', 'female', 'other'),
  
  address: Joi.string().allow(''),
  
  referralCode: Joi.string().allow(''),
  
  userRole: Joi.string().allow('').valid('admin', 'user', 'vendor').default('user'),
  
  // Also accept 'role' as an alternative to userRole
  role: Joi.string().allow('').valid('admin', 'user', 'vendor')
});

// Validation schema for profile updates
const updateProfileSchema = Joi.object({
  fullName: Joi.string().min(3).max(100).messages({
    'string.min': 'Name must be at least 3 characters',
    'string.max': 'Name must not exceed 100 characters'
  }),
  
  phoneNumber: Joi.string().allow('').pattern(/^[0-9]{10}$/).messages({
    'string.pattern.base': 'Phone number must be 10 digits'
  }),
  
  username: Joi.string().allow('').min(3).max(50).messages({
    'string.min': 'Username must be at least 3 characters',
    'string.max': 'Username must not exceed 50 characters'
  }),
  
  dateOfBirth: Joi.date().allow('').max('now').messages({
    'date.max': 'Date of birth must be in the past'
  }),
  
  gender: Joi.string().allow('').valid('male', 'female', 'other'),
  
  address: Joi.string().allow('')
});

module.exports = {
  signupSchema,
  updateProfileSchema
}; 