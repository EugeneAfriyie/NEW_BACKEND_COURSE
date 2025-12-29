const express = require("express");
const { registerUser, loginUser, getallUsers } = require("../controllers/auth_controller");


const router = express.Router();

// all routes related to user authentication and authorization
router.post("/register", registerUser)
router.post("/login", loginUser)
router.get("/getallusers", getallUsers)


module.exports = router;
