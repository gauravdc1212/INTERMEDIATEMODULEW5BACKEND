import express from "express";
import { register, login } from "../controllers/authcontroller.js";

const router = express.Router();

// Register
router.post("/register", register);

// Login
router.post("/login", login);

export default router;