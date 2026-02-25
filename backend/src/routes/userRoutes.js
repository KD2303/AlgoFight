const express = require('express');
const router = express.Router();
const { getProfile, getLeaderboard } = require('../controllers/userController');
const { protect } = require('../../middleware/authMiddleware');

router.get('/profile', protect, getProfile);
router.get('/leaderboard', getLeaderboard); // Public

module.exports = router;
