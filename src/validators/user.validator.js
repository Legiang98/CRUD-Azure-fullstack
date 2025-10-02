import Joi from "joi";

export function getUserByIdValidator(param) {
    const schema = Joi.object({
        id: Joi.number().integer().min(1).required(),
    });
    return schema.validate(body);
}

export function getListUserValidator(body) {
    const schema = Joi.object({
        page: Joi.number().integer().min(1).default(1),
        limit: Joi.number().integer().min(1).max(100).default(10),
        search: Joi.string().max(100).allow("", null).optional(),
    });
    return schema.validate(body);
}

export function createUserValidator(body) {
    const schema = Joi.object({
        username: Joi.string().alphanum().min(3).max(30).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).max(100).required(),
    });
    return schema.validate(body);
}

export function deleteUserValidator(body) {
    const schema = Joi.object({
        id: Joi.number().integer().min(1).required(),
    });
    return schema.validate(body);
}

export function updateUserValidator(body) {
    const schema = Joi.object({
        username: Joi.string().alphanum().min(3).max(30).optional(),
        email: Joi.string().email().optional(),
        password: Joi.string().min(6).max(100).optional(),
    }).or('username', 'email', 'password'); 
    return schema.validate(body);
}