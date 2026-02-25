/**
 * Generic Joi validation middleware.
 * Accepts a Joi schema and validates req.body against it.
 */
const validate = (schema) => {
    return (req, res, next) => {
        const { error, value } = schema.validate(req.body, {
            abortEarly: false,
            stripUnknown: true
        });

        if (error) {
            const errors = error.details.map((detail) => detail.message);
            return res.status(400).json({
                message: 'Validation Error',
                errors
            });
        }

        req.body = value; // use sanitized values
        next();
    };
};

module.exports = validate;
