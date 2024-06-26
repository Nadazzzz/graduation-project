const express = require('express');
const router = express.Router();
const paymentCardController = require('../controllers/paymentCardController');

router.post('/:userId', paymentCardController.addPaymentCard);

module.exports = router;