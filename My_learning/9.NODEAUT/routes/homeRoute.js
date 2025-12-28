const express = require('express');

const router = express.Router();


// all routes related to admin functionalities
router.get("/welcome", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Welcome to the Home Page"
    });
});

module.exports = router;