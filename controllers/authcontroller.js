import { registerUser, loginUser } from "../services/authservice.js";

// REGISTER
export const register = async (req, res) => {
  try {
    const data = await registerUser(req.body);

    res.status(201).json({
      message: "User registered successfully",
      ...data,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

// LOGIN
export const login = async (req, res) => {
  try {
    const data = await loginUser(req.body);

    res.status(200).json({
      message: "Login successful",
      ...data,
    });
  } catch (error) {
    res.status(401).json({
      message: error.message,
    });
  }
};