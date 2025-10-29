import Joi from "joi";

export const createRoleValidator = Joi.object({
  name: Joi.string().required().min(1).max(50),
  description: Joi.string().optional().max(255)
});

export const updateRoleValidator = Joi.object({
  name: Joi.string().optional().min(1).max(50),
  description: Joi.string().optional().max(255)
});

export const getRoleByIdValidator = Joi.object({
  id: Joi.number().integer().positive().required()
});

export const deleteRoleValidator = Joi.object({
  id: Joi.number().integer().positive().required()
});

export const getListRoleValidator = Joi.object({
  limit: Joi.number().integer().min(1).max(100).optional(),
  offset: Joi.number().integer().min(0).optional()
});