const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// MongoDB Model
const User = require("../models/User");

// VALIDATION Import
const { registerValidation, loginValidation } = require("../validation");

// Register User
exports.registerUser = [
  async (req, res) => {
    // Validate User
    const { error } = registerValidation(req.body);
    if (error)
      return apiResponse.ErrorResponse(
        res,
        "Validation error: " + error.details[0].message
      );

    // Check if User already in database
    const emailExist = await User.findOne({ email: req.body.email });
    if (emailExist)
      return apiResponse.ErrorResponse(res, "Email already exists");

    // Hash Passwords
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // Validated And Create User
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });

    try {
      user.save(async (err) => {
        if (err) {
          console.log("Error: " + err);
          return apiResponse.ErrorResponse(res, err);
        }
        console.log("Saved user");
        let savedUser = {
          _id: authority._id,
          name: user.name,
          email: user.email,
        };
        return apiResponse.successResponseWithData(
          res,
          "Operation success",
          savedUser
        );
      });
    } catch (err) {
      console.log("Error " + err);
      return apiResponse.ErrorResponse(res, err);
    }
  },
];

// Login User
exports.loginUser = [
  async (req, res) => {
    const { error } = loginValidation(req.body);
    if (error)
      return apiResponse.ErrorResponse(
        res,
        "Validation error: " + error.details[0].message
      );

    // Check if Email Exists
    const user = await User.findOne({ email: req.body.email });
    if (!user) return apiResponse.ErrorResponse(res, "Email Does Not Exist");

    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) return apiResponse.ErrorResponse(res, "Invalid Password");

    // Create & Assign Token
    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
    res.header("auth-token", token).send(token);
  },
];

// Delete user
exports.deleteUser = [
  async (req, res) => {
    try {
      const removedUser = await User.deleteOne({ _id: req.params.uid });
      return apiResponse.successResponseWithData(
        res,
        "Operation success",
        removedUser
      );
    } catch (err) {
      return apiResponse.ErrorResponse(res, err);
    }
  },
];
