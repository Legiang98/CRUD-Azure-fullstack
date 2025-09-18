import { User } from "../models/user.model.js";
import { USER_MESSAGES } from "../constants/messages.js";

export async function getUserProfile(req, res) {
  try {
    const userId = req.userId; // Assume req.userId is set by verifyToken middleware
    const user = await User.findByPk(userId, {
      attributes: { exclude: ['password'] } // Exclude password field
    });
    if (!user) {
      return res.status(404).json({ message: USER_MESSAGES.USER_NOT_FOUND });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error("Get user profile error:", error);
    res.status(500).json({ 
      message: USER_MESSAGES.ERROR_GETTING_USER_PROFILE, 
      error: error.message 
    });
  }
}

export async function updateUser(req, res) {
  try {
    const userId = req.userId; // Assume req.userId is set by verifyToken middleware
    const { username, email } = req.body;
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: USER_MESSAGES.USER_NOT_FOUND });
    }
    // Update fields
    if (username) user.username = username;
    if (email) user.email = email;
    await user.save();
    res.status(200).json({ message: USER_MESSAGES.USER_UPDATED_SUCCESS });
  } catch (error) {
    console.error("Update user error:", error);
    res.status(500).json({ 
      message: USER_MESSAGES.ERROR_UPDATING_USER, 
      error: error.message 
    });
  }
}

export async function getAllUsers(req, res) {
  try { 
    const users = await User.findAll({
      attributes: { exclude: ['password'] } // Exclude password field
    });
    res.status(200).json(users);
  } catch (error) {
    console.error("Get all users error:", error);
    res.status(500).json({ 
      message: USER_MESSAGES.ERROR_GETTING_USERS, 
      error: error.message 
    });
  }
}

export async function deleteUser(req, res) {
  try {
    const userId = req.params.id;
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: USER_MESSAGES.USER_NOT_FOUND });
    }
    await user.destroy();
    res.status(200).json({ message: USER_MESSAGES.USER_DELETED_SUCCESS });
  } catch (error) {
    console.error("Delete user error:", error);
    res.status(500).json({ 
      message: USER_MESSAGES.ERROR_DELETING_USER, 
      error: error.message 
    });
  }
}
