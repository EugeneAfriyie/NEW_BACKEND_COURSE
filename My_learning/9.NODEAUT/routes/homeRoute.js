const express = require('express');
const authMiddleware = require('../Middleware/authMiddleware');

const router = express.Router();


// all routes related to admin functionalities
router.get("/welcome", authMiddleware, (req, res) => {
    const {username,role,userId} = req.userinfo
    res.status(200).json({
        success: true,
        message: "Welcome to the Home Page",
        user : [
            username,role,userId
        ]
    });
});

module.exports = router;