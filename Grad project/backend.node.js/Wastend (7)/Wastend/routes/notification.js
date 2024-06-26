const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');

router.post('/oo', notificationController.updateNotificationPreference);

module.exports = router;