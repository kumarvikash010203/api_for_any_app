const mongoose = require('mongoose');

// MongoDB connection configuration
const connectDB = async () => {
  try {
    // Use local MongoDB by default, or the connection string from environment variables
    const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/signup_db';
    
    console.log('MongoDB Connection Config:', {
      uri: mongoURI.replace(/mongodb:\/\/([^:]+):([^@]+)@/, 'mongodb://***:***@') // Hide credentials if any
    });
    
    // Connect to MongoDB
    const conn = await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1); // Exit with failure
  }
};

module.exports = connectDB; 