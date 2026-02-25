const express = require('express');
const router = express.Router();
const {
    createRandomMatch,
    leaveQueue,
    createFriendMatch,
    joinFriendMatch,
    getMatch,
    getMatchHistory
} = require('../controllers/matchController');
const { protect } = require('../../middleware/authMiddleware');
const validate = require('../middleware/validate');
const { joinFriendRoomSchema } = require('../validation/matchValidation');

// All match routes are protected
router.use(protect);

router.post('/random', createRandomMatch);
router.post('/leave-queue', leaveQueue);
router.post('/friend', createFriendMatch);
router.post('/friend/join', validate(joinFriendRoomSchema), joinFriendMatch);
router.get('/history', getMatchHistory);
router.get('/:id', getMatch);

module.exports = router;
