const { processSubmission } = require('../services/submissionService');
const Submission = require('../models/Submission');
const logger = require('../config/logger');

/**
 * @desc    Submit code for a match
 * @route   POST /api/submit
 * @access  Private
 */
exports.submitCode = async (req, res, next) => {
    try {
        const { matchId, code, language } = req.body;

        const submission = await processSubmission(
            req.user._id,
            matchId,
            code,
            language
        );

        res.status(201).json({
            message: `Submission ${submission.status}`,
            submission
        });
    } catch (error) {
        // Handle known business errors with 400
        if (error.message.includes('not found') ||
            error.message.includes('not active') ||
            error.message.includes('not a participant') ||
            error.message.includes('expired')) {
            return res.status(400).json({ message: error.message });
        }
        next(error);
    }
};

/**
 * @desc    Get submissions for a match
 * @route   GET /api/submit/:matchId
 * @access  Private
 */
exports.getSubmissions = async (req, res, next) => {
    try {
        const submissions = await Submission.find({ matchId: req.params.matchId })
            .populate('userId', 'username')
            .sort({ submittedAt: -1 });

        res.json(submissions);
    } catch (error) {
        next(error);
    }
};
