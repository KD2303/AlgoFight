const Match = require('../models/Match');
const Problem = require('../models/Problem');
const { v4: uuidv4 } = require('uuid');
const logger = require('../config/logger');

// In-memory matchmaking queue
const matchmakingQueue = [];

/**
 * Join the random matchmaking queue.
 * If another player is waiting, create a match. Otherwise, add to queue.
 */
const joinQueue = async (userId) => {
    // Check if user is already in queue
    const existingIndex = matchmakingQueue.findIndex(
        (entry) => entry.userId.toString() === userId.toString()
    );
    if (existingIndex !== -1) {
        return { status: 'already_queued', message: 'You are already in the matchmaking queue' };
    }

    // Check if user is already in an active match
    const activeMatch = await Match.findOne({
        $or: [{ player1: userId }, { player2: userId }],
        status: { $in: ['waiting', 'active'] }
    });
    if (activeMatch) {
        return { status: 'in_match', match: activeMatch };
    }

    // If queue has a waiting player, create a match
    if (matchmakingQueue.length > 0) {
        const opponent = matchmakingQueue.shift();

        // Don't match with yourself
        if (opponent.userId.toString() === userId.toString()) {
            matchmakingQueue.push(opponent);
            return { status: 'queued', message: 'Waiting for an opponent...' };
        }

        // Pick a random problem
        const problem = await getRandomProblem();
        if (!problem) {
            matchmakingQueue.unshift(opponent); // put opponent back
            return { status: 'error', message: 'No problems available. Please try again later.' };
        }

        const match = await Match.create({
            player1: opponent.userId,
            player2: userId,
            problemId: problem._id,
            status: 'active',
            startTime: new Date()
        });

        logger.info(`Match created: ${match._id} | ${opponent.userId} vs ${userId}`);

        return {
            status: 'matched',
            match: await match.populate(['player1', 'player2', 'problemId'])
        };
    }

    // No one waiting — add to queue
    matchmakingQueue.push({ userId, joinedAt: new Date() });
    logger.info(`Player ${userId} joined matchmaking queue. Queue size: ${matchmakingQueue.length}`);

    return { status: 'queued', message: 'Waiting for an opponent...' };
};

/**
 * Leave the matchmaking queue.
 */
const leaveQueue = (userId) => {
    const index = matchmakingQueue.findIndex(
        (entry) => entry.userId.toString() === userId.toString()
    );
    if (index !== -1) {
        matchmakingQueue.splice(index, 1);
        logger.info(`Player ${userId} left matchmaking queue. Queue size: ${matchmakingQueue.length}`);
        return { status: 'left', message: 'Left the matchmaking queue' };
    }
    return { status: 'not_found', message: 'You were not in the queue' };
};

/**
 * Create a friend challenge room.
 */
const createFriendRoom = async (userId) => {
    // Check if user is already in an active match
    const activeMatch = await Match.findOne({
        $or: [{ player1: userId }, { player2: userId }],
        status: { $in: ['waiting', 'active'] }
    });
    if (activeMatch) {
        return { status: 'in_match', match: activeMatch };
    }

    const roomId = uuidv4().slice(0, 8).toUpperCase(); // Short readable room code

    const match = await Match.create({
        player1: userId,
        status: 'waiting',
        roomId
    });

    logger.info(`Friend room created: ${roomId} by player ${userId}`);

    return { status: 'created', roomId, matchId: match._id };
};

/**
 * Join an existing friend challenge room.
 */
const joinFriendRoom = async (userId, roomId) => {
    const match = await Match.findOne({ roomId, status: 'waiting' });

    if (!match) {
        return { status: 'not_found', message: 'Room not found or match already started' };
    }

    if (match.player1.toString() === userId.toString()) {
        return { status: 'error', message: 'You cannot join your own room' };
    }

    // Pick a random problem
    const problem = await getRandomProblem();
    if (!problem) {
        return { status: 'error', message: 'No problems available. Please try again later.' };
    }

    match.player2 = userId;
    match.problemId = problem._id;
    match.status = 'active';
    match.startTime = new Date();
    await match.save();

    logger.info(`Player ${userId} joined room ${roomId}. Match ${match._id} is now active.`);

    return {
        status: 'matched',
        match: await match.populate(['player1', 'player2', 'problemId'])
    };
};

/**
 * Get a random problem from the database.
 */
const getRandomProblem = async () => {
    const count = await Problem.countDocuments();
    if (count === 0) return null;
    const random = Math.floor(Math.random() * count);
    return Problem.findOne().skip(random);
};

/**
 * Get current queue size.
 */
const getQueueSize = () => matchmakingQueue.length;

module.exports = {
    joinQueue,
    leaveQueue,
    createFriendRoom,
    joinFriendRoom,
    getQueueSize
};
