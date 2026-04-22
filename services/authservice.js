import User from "../models/usermodel.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken.js";

// REGISTER
export const registerUser = async ({ name, email, password }) => {
  // Check existing user
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error("User already exists");
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);
   const role =
    email === process.env.ADMIN_EMAIL ? "admin" : "user";

  // Create user
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    role
  });

  // Generate token
  const token = generateToken(user._id);

  return { user, token };
};

// LOGIN
export const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error("Invalid credentials");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Invalid credentials");

  const token = generateToken(user._id);

  return { user, token };
};