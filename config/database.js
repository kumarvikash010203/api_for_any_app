const mongoose = require('mongoose');

// MongoDB connection configuration
const connectDB = async () => {
  try {
    // Prioritize MongoDB Atlas connection from environment variables or use provided default
    const defaultMongoURI = process.env.NODE_ENV === 'production' 
      ? 'mongodb+srv://iosdeveloperinswift:845274851133@api.yhcbbtb.mongodb.net/signup_db?retryWrites=true&w=majority'
      : 'mongodb://localhost:27017/signup_db';
    
    const mongoURI = process.env.MONGO_URI || defaultMongoURI;
    
    console.log('MongoDB Connection Config:', {
      uri: mongoURI.replace(/mongodb:\/\/([^:]+):([^@]+)@/, 'mongodb://***:***@') // Hide credentials if any
    });
    
    // Connect to MongoDB with updated options
    const conn = await mongoose.connect(mongoURI);
    
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1); // Exit with failure
  }
};

module.exports = connectDB; 