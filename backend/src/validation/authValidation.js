const Joi = require('joi');

const registerSchema = Joi.object({
    username: Joi.string().trim().min(3).max(30).required()
        .messages({
            'string.min': 'Username must be at least 3 characters',
            'string.max': 'Username must be at most 30 characters',
            'any.required': 'Username is required'
        }),
    email: Joi.string().trim().email().required()
        .messages({
            'string.email': 'Please provide a valid email',
            'any.required': 'Email is required'
        }),
    password: Joi.string().min(6).max(128).required()
        .messages({
            'string.min': 'Password must be at least 6 characters',
            'any.required': 'Password is required'
        })
});

const loginSchema = Joi.object({
    email: Joi.string().trim().email().required()
        .messages({
            'string.email': 'Please provide a valid email',
            'any.required': 'Email is required'
        }),
    password: Joi.string().required()
        .messages({
            'any.required': 'Password is required'
        })
});

module.exports = { registerSchema, loginSchema };
