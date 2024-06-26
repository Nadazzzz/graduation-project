const express = require('express');
const router = express.Router();
const donationController = require('../controllers/donationController');

//donate by food
router.post('/food/:userId', donationController.createDonation);

//donate by money
router.post('/money/:userId', donationController.createMonetaryDonation);

module.exports = router;