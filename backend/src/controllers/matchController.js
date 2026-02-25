const matchmakingService = require('../services/matchmakingService');
const Match = require('../models/Match');
const logger = require('../config/logger');

/**
 * @desc    Join random matchmaking queue
 * @route   POST /api/match/random
 * @access  Private
 */
exports.createRandomMatch = async (req, res, next) => {
    try {
        const result = await matchmakingService.joinQueue(req.user._id);

        if (result.status === 'matched') {
            return res.status(201).json({
                message: 'Match found!',
                match: result.match
            });
        }

        if (result.status === 'queued' || result.status === 'already_queued') {
            return res.status(200).json({
                message: result.message,
                queueSize: matchmakingService.getQueueSize()
            });
        }

        if (result.status === 'in_match') {
            return res.status(400).json({
                message: 'You are already in an active match',
                match: result.match
            });
        }

        return res.status(400).json({ message: result.message });
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Leave matchmaking queue
 * @route   POST /api/match/leave-queue
 * @access  Private
 */
exports.leaveQueue = async (req, res, next) => {
    try {
        const result = matchmakingService.leaveQueue(req.user._id);
        res.json({ message: result.message });
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Create a friend challenge room
 * @route   POST /api/match/friend
 * @access  Private
 */
exports.createFriendMatch = async (req, res, next) => {
    try {
        const result = await matchmakingService.createFriendRoom(req.user._id);

        if (result.status === 'in_match') {
            return res.status(400).json({
                message: 'You are already in an active match',
                match: result.match
            });
        }

        res.status(201).json({
            message: 'Friend room created. Share the room code with your friend.',
            roomId: result.roomId,
            matchId: result.matchId
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Join a friend challenge room
 * @route   POST /api/match/friend/join
 * @access  Private
 */
exports.joinFriendMatch = async (req, res, next) => {
    try {
        const { roomId } = req.body;
        const result = await matchmakingService.joinFriendRoom(req.user._id, roomId);

        if (result.status === 'matched') {
            return res.status(200).json({
                message: 'Joined match!',
                match: result.match
            });
        }

        return res.status(400).json({ message: result.message });
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Get match details by ID
 * @route   GET /api/match/:id
 * @access  Private
 */
exports.getMatch = async (req, res, next) => {
    try {
        const match = await Match.findById(req.params.id)
            .populate('player1', 'username rating')
            .populate('player2', 'username rating')
            .populate('problemId')
            .populate('submissions');

        if (!match) {
            return res.status(404).json({ message: 'Match not found' });
        }

        // Verify user is a participant
        const userId = req.user._id.toString();
        const isParticipant =
            match.player1._id.toString() === userId ||
            (match.player2 && match.player2._id.toString() === userId);

        if (!isParticipant) {
            return res.status(403).json({ message: 'You are not a participant in this match' });
        }

        res.json(match);
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Get user's match history
 * @route   GET /api/match/history
 * @access  Private
 */
exports.getMatchHistory = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const userId = req.user._id;

        const [matches, total] = await Promise.all([
            Match.find({
                $or: [{ player1: userId }, { player2: userId }],
                status: 'completed'
            })
                .populate('player1', 'username rating')
                .populate('player2', 'username rating')
                .populate('problemId', 'title difficulty')
                .sort({ endTime: -1 })
                .skip(skip)
                .limit(limit),
            Match.countDocuments({
                $or: [{ player1: userId }, { player2: userId }],
                status: 'completed'
            })
        ]);

        res.json({
            matches,
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
