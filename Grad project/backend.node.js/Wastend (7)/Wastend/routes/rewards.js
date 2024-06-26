const express = require('express');
const router = express.Router();
const rewardsController = require('../controllers/rewardsController');

// GET /rewards - Retrieve available rewards
router.get('/:userId', rewardsController.getRewards);
 
// POST /rewards/redeem/:userId - Redeem a reward
router.post('/redeem/:userId', rewardsController.redeemReward);
module.exports = router;