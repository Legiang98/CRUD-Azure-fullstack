// Signup middleware
import { User } from "../models/user.model.js";
import { Role } from "../models/role.model.js";
import { MIDDLEWARE_MESSAGES } from "../constants/messages.js";

export async function checkDuplicateUsernameOrEmail(req, res, next) {
  try {
    const { username, email } = req.body;

    // Check for duplicate username
    const existingUserByUsername = await User.findOne({ 
      where: { username } 
    });
    
    if (existingUserByUsername) {
      return res.status(400).json({ 
        message: MIDDLEWARE_MESSAGES.USERNAME_ALREADY_IN_USE
      });
    }

    // Check for duplicate email
    const existingUserByEmail = await User.findOne({ 
      where: { email } 
    });
    
    if (existingUserByEmail) {
      return res.status(400).json({ 
        message: MIDDLEWARE_MESSAGES.EMAIL_ALREADY_IN_USE
      });
    }

    next();
  } catch (error) {
    return res.status(500).json({ 
      message: MIDDLEWARE_MESSAGES.ERROR_CHECKING_DUPLICATE_USER, 
      error: error.message 
    });
  }
}

export async function checkRolesExisted(req, res, next) {
  try {
    const { roles } = req.body;

    // If no roles provided, skip validation
    if (!roles || roles.length === 0) {
      return next();
    }

    // Check if all provided roles exist in database
    for (let roleName of roles) {
      const role = await Role.findOne({ 
        where: { name: roleName } 
      });
      
      if (!role) {
        return res.status(400).json({
          message: `Failed! Role ${roleName} ${MIDDLEWARE_MESSAGES.ROLE_DOES_NOT_EXIST}`
        });
      }
    }

    next();
  } catch (error) {
    return res.status(500).json({ 
      message: MIDDLEWARE_MESSAGES.ERROR_CHECKING_ROLES, 
      error: error.message 
    });
  }
}
