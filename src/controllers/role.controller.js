import { Role } from "../models/index.js";
import { ROLE_MESSAGES } from "../constants/messages.js";

export async function createRole(req, res) {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ message: ROLE_MESSAGES.ROLE_NAME_REQUIRED });
    }
    const existingRole = await Role.findOne({ where: { name } });
    if (existingRole) {
      return res.status(400).json({ message: ROLE_MESSAGES.ROLE_ALREADY_EXISTS });
    }
    const newRole = await Role.create({ name });
    res.status(201).json(newRole);
  } catch (error) {
    res
      .status(500)
      .json({ message: ROLE_MESSAGES.ERROR_CREATING_ROLE, error: error.message });
  }
}

export async function getAllRoles(req, res) {
  try {
    const roles = await Role.findAll();
    res.status(200).json(roles);
  } catch (error) {
    res
      .status(500)
      .json({ message: ROLE_MESSAGES.ERROR_FETCHING_ROLES, error: error.message });
  }
}

export async function deleteRole(req, res) {
  try {
    const roleId = req.params.id;
    const role = await Role.findByPk(roleId);
    if (!role) {
      return res.status(404).json({ message: ROLE_MESSAGES.ROLE_NOT_FOUND });
    }
    await role.destroy();
    res.status(200).json({ message: ROLE_MESSAGES.ROLE_DELETED_SUCCESS });
  } catch (error) {
    res
      .status(500)
      .json({ message: ROLE_MESSAGES.ERROR_DELETING_ROLE, error: error.message });
  }
}
