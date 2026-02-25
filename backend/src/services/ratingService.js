const User = require('../../models/User');
const logger = require('../config/logger');

/**
 * Calculate Elo expected score.
 * E(A) = 1 / (1 + 10^((Rb - Ra) / 400))
 */
const expectedScore = (ratingA, ratingB) => {
    return 1 / (1 + Math.pow(10, (ratingB - ratingA) / 400));
};

/**
 * Calculate new rating after a match.
 * New Rating = Old Rating + K * (Actual - Expected)
 *
 * @param {number} oldRating - Current rating
 * @param {number} expected - Expected score (0 to 1)
 * @param {number} actual - Actual score (1 = win, 0.5 = draw, 0 = loss)
 * @param {number} kFactor - K-factor (default from env or 32)
 * @returns {number} New rating
 */
const calculateNewRating = (oldRating, expected, actual, kFactor) => {
    return Math.round(oldRating + kFactor * (actual - expected));
};

/**
 * Update ratings for both players after a match.
 *
 * @param {string} winnerId - ObjectId of winning player (null if draw)
 * @param {string} loserId - ObjectId of losing player (null if draw)
 * @param {string} player1Id - ObjectId of player 1 (used for draws)
 * @param {string} player2Id - ObjectId of player 2 (used for draws)
 * @param {boolean} isDraw - Whether the match is a draw
 */
const updateRatings = async (winnerId, loserId, player1Id, player2Id, isDraw = false) => {
    const kFactor = parseInt(process.env.ELO_K_FACTOR) || 32;

    if (isDraw) {
        const player1 = await User.findById(player1Id);
        const player2 = await User.findById(player2Id);

        if (!player1 || !player2) {
            logger.error('Could not find players for rating update');
            return;
        }

        const expected1 = expectedScore(player1.rating, player2.rating);
        const expected2 = expectedScore(player2.rating, player1.rating);

        player1.rating = calculateNewRating(player1.rating, expected1, 0.5, kFactor);
        player2.rating = calculateNewRating(player2.rating, expected2, 0.5, kFactor);
        player1.matchesPlayed += 1;
        player2.matchesPlayed += 1;

        await player1.save();
        await player2.save();

        logger.info(`Draw: ${player1.username} (${player1.rating}) vs ${player2.username} (${player2.rating})`);
    } else {
        const winner = await User.findById(winnerId);
        const loser = await User.findById(loserId);

        if (!winner || !loser) {
            logger.error('Could not find players for rating update');
            return;
        }

        const expectedWinner = expectedScore(winner.rating, loser.rating);
        const expectedLoser = expectedScore(loser.rating, winner.rating);

        winner.rating = calculateNewRating(winner.rating, expectedWinner, 1, kFactor);
        loser.rating = calculateNewRating(loser.rating, expectedLoser, 0, kFactor);
        winner.matchesPlayed += 1;
        winner.matchesWon += 1;
        loser.matchesPlayed += 1;

        await winner.save();
        await loser.save();

        logger.info(`Win: ${winner.username} (${winner.rating}) beat ${loser.username} (${loser.rating})`);
    }
};

module.exports = { updateRatings, expectedScore, calculateNewRating };
