const express = require('express');
const router = express.Router();
const performanceController = require('../controllers/performanceController');

// Route for getting performance
router.get('/:storeId', performanceController.getPerformance);

// Route for getting Insights

router.get('/Insights/:storeId', performanceController.getInsights);


module.exports = router;
