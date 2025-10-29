import { User } from "../models/user.model.js";
import { 
  createUserValidator,
  updateUserValidator,
  deleteUserValidator,
  getUserByIdValidator,
  getListUserValidator,
} from "../validators/user.validator.js";
import { StatusCodes } from "http-status-codes";
import { ErrorHelper } from "../utils/errorHelper.js";

export const getAllUsers = async (req, res) => {
  try {
    const { error } = getListUserValidator.validate(req.query);
    if (error) {
      return res.status(StatusCodes.BAD_REQUEST).json({ message: error.details[0].message });
    }
    
    const users = await User.findAll();
    if (!users || users.length === 0) {
      const code = "0002";
      return res.status(StatusCodes.NOT_FOUND).json(
        ErrorHelper(code)
      );
    }
    
    return res.status(StatusCodes.OK).json({ 
      code: "0000", 
      data: users,
      count: users.length 
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(
      ErrorHelper("5000", error.message)
    );
  }
};

export const getUserById = async (req, res) => {
  try {
    const { error } = getUserByIdValidator.validate(req.params);
    if (error) {
      return res.status(StatusCodes.BAD_REQUEST).json({ message: error.details[0].message });
    }
    
    const user = await User.findByPk(req.params.id);
    if (!user) {
      const code = "0001";
      return res.status(StatusCodes.NOT_FOUND).json(
        ErrorHelper(code)
      );
    }
    
    return res.status(StatusCodes.OK).json({ 
      code: "0000", 
      data: user 
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(
      ErrorHelper("5000", error.message)
    );
}
};

export const createUser = async (req, res) => {
  try {
    const { error } = createUserValidator.validate(req.body);
    if (error) {
      return res.status(StatusCodes.BAD_REQUEST).json({ message: error.details[0].message });
    }

    const user = await User.create(req.body);
    
    return res.status(StatusCodes.CREATED).json({ 
      code: "0000", 
      data: user 
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(
      ErrorHelper("5000", error.message)
    );
  }
};

export const updateUser = async (req, res) => {
  try {
    const { error: paramError } = getUserByIdValidator.validate(req.params);
    if (paramError) {
      return res.status(StatusCodes.BAD_REQUEST).json({ message: paramError.details[0].message });
    }

    const { error: bodyError } = updateUserValidator.validate(req.body);
    if (bodyError) {
      return res.status(StatusCodes.BAD_REQUEST).json({ message: bodyError.details[0].message });
    }

    const user = await User.findByPk(req.params.id);
    if (!user) {
      const code = "0001";
      return res.status(StatusCodes.NOT_FOUND).json(
        ErrorHelper(code)
      );
    }

    await user.update(req.body);
    
    return res.status(StatusCodes.OK).json({ 
      code: "0000", 
      data: user 
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(
      ErrorHelper("5000", error.message)
    );
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { error } = deleteUserValidator.validate(req.params);
    if (error) {
      return res.status(StatusCodes.BAD_REQUEST).json({ message: error.details[0].message });
    }

    const user = await User.findByPk(req.params.id);
    if (!user) {
      const code = "0001";
      return res.status(StatusCodes.NOT_FOUND).json(
        ErrorHelper(code)
      );
    }

    await user.destroy();
    
    return res.status(StatusCodes.OK).json({ 
      code: "0000", 
      message: "User deleted successfully" 
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(
      ErrorHelper("5000", error.message)
    );
  }
};