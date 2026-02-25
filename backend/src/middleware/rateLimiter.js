const rateLimit = require('express-rate-limit');

// General API rate limiter
const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
        message: 'Too many requests from this IP, please try again after 15 minutes'
    }
});

// Stricter rate limiter for auth endpoints
const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 20,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
        message: 'Too many authentication attempts, please try again after 15 minutes'
    }
});

module.exports = { apiLimiter, authLimiter };
