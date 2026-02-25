const express = require('express');
const router = express.Router();
const { submitCode, getSubmissions } = require('../controllers/submissionController');
const { protect } = require('../../middleware/authMiddleware');
const validate = require('../middleware/validate');
const { submitCodeSchema } = require('../validation/submissionValidation');

// All submission routes are protected
router.use(protect);

router.post('/', validate(submitCodeSchema), submitCode);
router.get('/:matchId', getSubmissions);

module.exports = router;
