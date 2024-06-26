const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');


// Route for making order
router.post('/orders', orderController.placeOrder);

module.exports = router;