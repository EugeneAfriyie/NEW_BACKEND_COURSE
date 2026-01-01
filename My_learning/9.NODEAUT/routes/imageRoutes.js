const express = require('express');
const router = express.Router();
const multer = require('multer');
const { uploadImage } = require('../controllers/image_controller');
const authMiddleware = require('../Middleware/authMiddleware');
const adminMiddleware = require('../Middleware/adminMiddleware');


// Upload the img 
router.post("upload,",authMiddleware,adminMiddleware)