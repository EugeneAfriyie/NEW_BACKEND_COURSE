const express = require("express");
const { registerUser, loginUser } = require("../controllers/auth_controller");


const router = express.Router();

// all routes related to user authentication and authorization
router.post("/register", registerUser)
router.get("/login", loginUser)



