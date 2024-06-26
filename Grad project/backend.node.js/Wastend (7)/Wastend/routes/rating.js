const express = require('express');
const router = express.Router();
const { submitRating } = require('../controllers/ratingController');

// POST /ratings/:userId/:mealId
router.post('/', submitRating);


module.exports = router;