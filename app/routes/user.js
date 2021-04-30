const express = require("express");
const router = express.Router();
const userController = require("../controllers/UserController");

// Register User
router.post("/register", userController.registerUser);

// Login User
router.post("/login", userController.loginUser);

// Delete user
router.delete("/:uid", userController.deleteUser);

module.exports = router;
