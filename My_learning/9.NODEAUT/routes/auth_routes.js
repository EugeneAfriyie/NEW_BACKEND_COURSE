const express = require("express");
const { registerUser, loginUser, getallUsers, changeUserPassword } = require("../controllers/auth_controller");
const authMiddleware = require("../Middleware/authMiddleware");


const router = express.Router();

// all routes related to user authentication and authorization
router.post("/register", registerUser)
router.post("/login", loginUser)
router.get("/getallusers", getallUsers)
router.post("/change-password",authMiddleware, changeUserPassword)


module.exports = router;
