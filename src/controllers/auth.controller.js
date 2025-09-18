// Authentication controller
import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { authConfig } from "../config/auth.config.js";
import { AUTH_MESSAGES } from "../constants/messages.js";

export async function register(req, res) {
  try {
    const { username, email, password } = req.body;

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create new user
    const user = await User.create({
      username,
      email,
      password: hashedPassword
    });

    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id, username: user.username },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    res.status(201).json({
      message: AUTH_MESSAGES.USER_REGISTERED_SUCCESS,
      user: {
        id: user.id,
        username: user.username,
        email: user.email
      },
      token
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({
      message: AUTH_MESSAGES.ERROR_REGISTERING_USER,
      error: error.message
    });
  }
}

export async function login(req, res) {
  try {
    const { username, password } = req.body;

    // Find user by username
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(404).json({
        message: AUTH_MESSAGES.USER_NOT_FOUND
      });
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        message: AUTH_MESSAGES.INVALID_PASSWORD
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id, username: user.username },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    res.status(200).json({
      message: AUTH_MESSAGES.LOGIN_SUCCESS,
      user: {
        id: user.id,
        username: user.username,
        email: user.email
      },
      token
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      message: AUTH_MESSAGES.ERROR_LOGGING_IN,
      error: error.message
    });
  }
}

export async function logout(req, res) {
  try {
    // For JWT, logout is typically handled on the client side
    // by removing the token from storage
    // You could implement a token blacklist here if needed
    
    res.status(200).json({
      message: AUTH_MESSAGES.LOGOUT_SUCCESS
    });
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({
      message: AUTH_MESSAGES.ERROR_LOGGING_OUT,
      error: error.message
    });
  }
}
