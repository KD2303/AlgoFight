const Joi = require('joi');

const submitCodeSchema = Joi.object({
    matchId: Joi.string().required()
        .messages({
            'any.required': 'Match ID is required'
        }),
    code: Joi.string().required().max(50000)
        .messages({
            'any.required': 'Code is required',
            'string.max': 'Code must be at most 50000 characters'
        }),
    language: Joi.string().valid('javascript', 'python', 'cpp', 'java').required()
        .messages({
            'any.only': 'Language must be one of: javascript, python, cpp, java',
            'any.required': 'Language is required'
        })
});

module.exports = { submitCodeSchema };
