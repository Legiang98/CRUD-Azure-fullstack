import Joi from "joi";

export const getUserByIdValidator = Joi.object({
    id: Joi.number().integer().min(1).required(),
});

export const getListUserValidator = Joi.object({
    page: Joi.number().integer().min(1).default(1),
    limit: Joi.number().integer().min(1).max(100).default(10),
    search: Joi.string().max(100).allow("", null).optional(),
});

export const createUserValidator = Joi.object({
    username: Joi.string().alphanum().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(100).required(),
});

export const deleteUserValidator = Joi.object({
    id: Joi.number().integer().min(1).required(),
});

export const updateUserValidator = Joi.object({
    username: Joi.string().alphanum().min(3).max(30).optional(),
    email: Joi.string().email().optional(),
    password: Joi.string().min(6).max(100).optional(),
}).or('username', 'email', 'password');