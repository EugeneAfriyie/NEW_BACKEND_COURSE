const express = require('express');
const authMiddleware = require('../Middleware/authMiddleware');
const adminMiddleware = require('../Middleware/adminMiddleware');
const router = express.Router();


router.get("/dashboard",authMiddleware,adminMiddleware, (req, res) => {
    res.status(200).json({
        success: true,
        message: "Welcome to the Admin Dashboard"
    });
});

module.exports = router;