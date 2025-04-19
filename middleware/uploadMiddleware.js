const multer = require('multer');
const path = require('path');

// Use memory storage for serverless environment
const storage = multer.memoryStorage();

// File filter
const fileFilter = (req, file, cb) => {
  // Check mime type first
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
    return;
  }
  
  // Also check file extension as fallback
  const validExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];
  const ext = path.extname(file.originalname).toLowerCase();
  if (validExtensions.includes(ext)) {
    cb(null, true);
    return;
  }
  
  cb(new Error('Only image files are allowed!'), false);
};

// Configure multer
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB max size
  },
  fileFilter: fileFilter
});

module.exports = upload; 