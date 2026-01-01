const express = require('express');
const router = express.Router();
const authMiddleware = require('../Middleware/authMiddleware');
const adminMiddleware = require('../Middleware/adminMiddleware');
const uploadMiddleware = require('../Middleware/uploadMiddleware');
const uploadImageController = require('../controllers/image_controller');


// Upload the img 
router.post("/upload,",authMiddleware,adminMiddleware,uploadMiddleware.single("image"),uploadImageController);

module.exports.uploadImageRoutes = router;