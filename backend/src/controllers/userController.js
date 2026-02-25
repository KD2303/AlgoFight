const User = require('../../models/User');

/**
 * @desc    Get current user's profile
 * @route   GET /api/profile
 * @access  Private
 */
exports.getProfile = async (req, res, next) => {
    try {
        const user = await User.findById(req.user._id).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Get leaderboard (paginated, sorted by rating)
 * @route   GET /api/leaderboard
 * @access  Public
 */
exports.getLeaderboard = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 20;
        const skip = (page - 1) * limit;

        const [users, total] = await Promise.all([
            User.find()
                .select('username rating matchesPlayed matchesWon')
                .sort({ rating: -1 })
                .skip(skip)
                .limit(limit),
            User.countDocuments()
        ]);

        // Add rank numbers
        const leaderboard = users.map((user, index) => ({
            rank: skip + index + 1,
            username: user.username,
            rating: user.rating,
            matchesPlayed: user.matchesPlayed,
            matchesWon: user.matchesWon,
            winRate: user.matchesPlayed > 0
                ? Math.round((user.matchesWon / user.matchesPlayed) * 100)
                : 0
        }));

        res.json({
            leaderboard,
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
};
