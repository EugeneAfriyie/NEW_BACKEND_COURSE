const express = require('express');
const router = express.Router();
const authMiddleware = require('../Middleware/authMiddleware');
const adminMiddleware = require('../Middleware/adminMiddleware');
const uploadMiddleware = require('../Middleware/uploadMiddleware');
const { uploadImageController, fetchAllImagesController, imageDeleteController, getAllImagesController } = require('../controllers/image_controller');


// Upload the img 
router.post("/upload",authMiddleware,adminMiddleware,uploadMiddleware.single("image"),uploadImageController);

// fetch all images
router.get("/fetchall",authMiddleware,adminMiddleware,fetchAllImagesController);

router.delete("/delete/:id",authMiddleware,adminMiddleware,imageDeleteController);
router.get("/allimage",authMiddleware,adminMiddleware,getAllImagesController);

module.exports.uploadImageRoutes = router;