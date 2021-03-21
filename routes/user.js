import { Router } from "express";
const router = Router();
import {
  registerUser,
  loginUser,
  deleteUser,
} from "../controllers/UserController";

// Register User
router.post("/register", registerUser);

// Login User
router.post("/login", loginUser);

// Delete user
router.delete("/:uid", deleteUser);

export default router;
