const express = require('express');
const router = express.Router();
const Problem = require('../models/Problem');

/**
 * @desc    Get all problems (paginated)
 * @route   GET /api/problems
 * @access  Public
 */
router.get('/', async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 20;
        const skip = (page - 1) * limit;
        const difficulty = req.query.difficulty;

        const filter = {};
        if (difficulty) {
            filter.difficulty = difficulty;
        }

        const [problems, total] = await Promise.all([
            Problem.find(filter)
                .select('title difficulty timeLimit createdAt')
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit),
            Problem.countDocuments(filter)
        ]);

        res.json({
            problems,
            pagination: {
                page,
                limit,
                total,
                pages: Math.ceil(total / limit)
            }
        });
    } catch (error) {
        next(error);
    }
});

/**
 * @desc    Get single problem by ID
 * @route   GET /api/problems/:id
 * @access  Public
 */
router.get('/:id', async (req, res, next) => {
    try {
        const problem = await Problem.findById(req.params.id);
        if (!problem) {
            return res.status(404).json({ message: 'Problem not found' });
        }
        res.json(problem);
    } catch (error) {
        next(error);
    }
});

module.exports = router;
