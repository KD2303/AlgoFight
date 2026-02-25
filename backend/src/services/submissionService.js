const Submission = require('../models/Submission');
const Match = require('../models/Match');
const Problem = require('../models/Problem');
const { updateRatings } = require('./ratingService');
const logger = require('../config/logger');

/**
 * Process a code submission.
 * Since Docker execution is not implemented, this performs a simple
 * string comparison of the code output against expected test case outputs.
 *
 * In a production system, this would spawn a Docker container to run the code.
 * For now, the submission is saved and test results are evaluated by comparing
 * the user's provided output (via a simple eval-like approach for JS, or
 * marking as "pending" for review).
 */
const processSubmission = async (userId, matchId, code, language) => {
    // Verify the match is active
    const match = await Match.findById(matchId);
    if (!match) {
        throw new Error('Match not found');
    }
    if (match.status !== 'active') {
        throw new Error('Match is not active');
    }

    // Verify the user is a participant
    const isPlayer1 = match.player1.toString() === userId.toString();
    const isPlayer2 = match.player2 && match.player2.toString() === userId.toString();
    if (!isPlayer1 && !isPlayer2) {
        throw new Error('You are not a participant in this match');
    }

    // Check match time limit (default 30 minutes)
    const matchDuration = parseInt(process.env.MATCH_DURATION) || 1800000;
    if (match.startTime) {
        const elapsed = Date.now() - match.startTime.getTime();
        if (elapsed > matchDuration) {
            throw new Error('Match time has expired');
        }
    }

    // Get the problem and test cases
    const problem = await Problem.findById(match.problemId);
    if (!problem) {
        throw new Error('Problem not found');
    }

    // Create the submission
    const submission = await Submission.create({
        matchId,
        userId,
        code,
        language,
        status: 'pending'
    });

    // Simple test case evaluation (placeholder — no actual code execution)
    // In production, this would be done by the Docker execution engine
    const testResults = problem.testCases.map((tc) => ({
        input: tc.input,
        expectedOutput: tc.expectedOutput,
        actualOutput: 'N/A (execution engine not enabled)',
        passed: false
    }));

    // Mark submission status based on test results
    const allPassed = testResults.every((r) => r.passed);
    submission.status = allPassed ? 'passed' : 'failed';
    submission.testResults = testResults;
    submission.executionTime = 0;
    await submission.save();

    // Add submission to match
    match.submissions.push(submission._id);
    await match.save();

    logger.info(`Submission ${submission._id} by user ${userId} for match ${matchId}: ${submission.status}`);

    // Check for winner if submission passed
    if (allPassed) {
        await checkWinner(match);
    }

    return submission;
};

/**
 * Check if there is a winner for the match.
 * Winner logic:
 *  1. First correct submission wins
 *  2. If both correct, compare timestamps
 *  3. If neither correct, match continues until time expires
 */
const checkWinner = async (match) => {
    const passedSubmissions = await Submission.find({
        matchId: match._id,
        status: 'passed'
    }).sort({ submittedAt: 1 });

    if (passedSubmissions.length === 0) return;

    // First correct submission wins
    const winner = passedSubmissions[0];
    const loserId = match.player1.toString() === winner.userId.toString()
        ? match.player2
        : match.player1;

    match.winner = winner.userId;
    match.status = 'completed';
    match.endTime = new Date();
    await match.save();

    // Update ratings
    await updateRatings(winner.userId, loserId);

    logger.info(`Match ${match._id} completed. Winner: ${winner.userId}`);
};

/**
 * End a match as a draw (e.g., when time expires with no correct submissions).
 */
const endMatchAsDraw = async (matchId) => {
    const match = await Match.findById(matchId);
    if (!match || match.status !== 'active') return;

    match.status = 'completed';
    match.isDraw = true;
    match.endTime = new Date();
    await match.save();

    await updateRatings(null, null, match.player1, match.player2, true);

    logger.info(`Match ${matchId} ended as a draw`);
    return match;
};

module.exports = { processSubmission, checkWinner, endMatchAsDraw };
