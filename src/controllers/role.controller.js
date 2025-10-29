import { Role } from "../models/index.js";
import { 
  createRoleValidator,
  updateRoleValidator,
  deleteRoleValidator,
  getRoleByIdValidator,
  getListRoleValidator,
} from "../validators/role.validator.js";
import { StatusCodes } from "http-status-codes";
import { ErrorHelper } from "../utils/errorHelper.js";

export const createRole = async (req, res) => {
  try {
    const { error } = createRoleValidator.validate(req.body);
    if (error) {
      return res.status(StatusCodes.BAD_REQUEST).json({ message: error.details[0].message });
    }

    const existingRole = await Role.findOne({
      where: { name: req.body.name } 
    });
    if (existingRole) {
      const code = "0004"; // Role already exists
      return res.status(StatusCodes.CONFLICT).json(
        ErrorHelper(code)
      );
    }

    const role = await Role.create(req.body);
    
    return res.status(StatusCodes.CREATED).json({ 
      code: "0000", 
      data: role 
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(
      ErrorHelper("5000", error.message)
    );
  }
};

export const getAllRoles = async (req, res) => {
  try {
    const { error } = getListRoleValidator.validate(req.query);
    if (error) {
      return res.status(StatusCodes.BAD_REQUEST).json({ message: error.details[0].message });
    }
    
    const roles = await Role.findAll();
    if (!roles || roles.length === 0) {
      const code = "0005"; // Roles not found
      return res.status(StatusCodes.NOT_FOUND).json(
        ErrorHelper(code)
      );
    }
    
    return res.status(StatusCodes.OK).json({ 
      code: "0000", 
      data: roles,
      count: roles.length 
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(
      ErrorHelper("5000", error.message)
    );
  }
};

export const getRoleById = async (req, res) => {
  try {
    const { error } = getRoleByIdValidator.validate(req.params);
    if (error) {
      return res.status(StatusCodes.BAD_REQUEST).json({ message: error.details[0].message });
    }
    
    const role = await Role.findByPk(req.params.id);
    if (!role) {
      const code = "0006"; // Role not found
      return res.status(StatusCodes.NOT_FOUND).json(
        ErrorHelper(code)
      );
    }
    
    return res.status(StatusCodes.OK).json({ 
      code: "0000", 
      data: role 
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(
      ErrorHelper("5000", error.message)
    );
  }
};

export const updateRole = async (req, res) => {
  try {
    const { error: paramError } = getRoleByIdValidator.validate(req.params);
    if (paramError) {
      return res.status(StatusCodes.BAD_REQUEST).json({ message: paramError.details[0].message });
    }

    const { error: bodyError } = updateRoleValidator.validate(req.body);
    if (bodyError) {
      return res.status(StatusCodes.BAD_REQUEST).json({ message: bodyError.details[0].message });
    }

    const role = await Role.findByPk(req.params.id);
    if (!role) {
      const code = "0006"; // Role not found
      return res.status(StatusCodes.NOT_FOUND).json(
        ErrorHelper(code)
      );
    }

    // Check if new name already exists (if name is being updated)
    if (req.body.name && req.body.name !== role.name) {
      const existingRole = await Role.findOne({ where: { name: req.body.name } });
      if (existingRole) {
        const code = "0004"; // Role already exists
        return res.status(StatusCodes.CONFLICT).json(
          ErrorHelper(code)
        );
      }
    }

    await role.update(req.body);
    
    return res.status(StatusCodes.OK).json({ 
      code: "0000", 
      data: role 
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(
      ErrorHelper("5000", error.message)
    );
  }
};

export const deleteRole = async (req, res) => {
  try {
    const { error } = deleteRoleValidator.validate(req.params);
    if (error) {
      return res.status(StatusCodes.BAD_REQUEST).json({ message: error.details[0].message });
    }

    const role = await Role.findByPk(req.params.id);
    if (!role) {
      const code = "0006"; // Role not found
      return res.status(StatusCodes.NOT_FOUND).json(
        ErrorHelper(code)
      );
    }

    await role.destroy();
    
    return res.status(StatusCodes.OK).json({ 
      code: "0000", 
      message: "Role deleted successfully" 
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(
      ErrorHelper("5000", error.message)
    );
  }
};
