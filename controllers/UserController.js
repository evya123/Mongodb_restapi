import { genSalt, hash, compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

// MongoDB Model
import User, { findOne, deleteOne } from "../models/User";

// VALIDATION Import
import { registerValidation, loginValidation } from "../validation";

export const registerUser = [
  async (req, res) => {
    // Validate User
    const { error } = registerValidation(req.body);
    if (error)
      return apiResponse.ErrorResponse(
        res,
        "Validation error: " + error.details[0].message
      );

    // Check if User already in database
    const emailExist = await findOne({ email: req.body.email });
    if (emailExist)
      return apiResponse.ErrorResponse(res, "Email already exists");

    // Hash Passwords
    const salt = await genSalt(10);
    const hashedPassword = await hash(req.body.password, salt);

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

export const loginUser = [
  async (req, res) => {
    const { error } = loginValidation(req.body);
    if (error)
      return apiResponse.ErrorResponse(
        res,
        "Validation error: " + error.details[0].message
      );

    // Check if Email Exists
    const user = await findOne({ email: req.body.email });
    if (!user) return apiResponse.ErrorResponse(res, "Email Does Not Exist");

    const validPass = await compare(req.body.password, user.password);
    if (!validPass) return apiResponse.ErrorResponse(res, "Invalid Password");

    // Create & Assign Token
    const token = sign({ _id: user._id }, process.env.TOKEN_SECRET);
    res.header("auth-token", token).send(token);
  },
];

export const deleteUser = [
  async (req, res) => {
    try {
      const removedUser = await deleteOne({ _id: req.params.uid });
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
