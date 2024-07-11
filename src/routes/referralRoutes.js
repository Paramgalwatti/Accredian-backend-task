const express = require('express');
const { saveReferral } = require('../controllers/referralController');

const router = express.Router();

// POST /api/referrals - Endpoint to save referral data
router.post('/', saveReferral);

module.exports = router;
