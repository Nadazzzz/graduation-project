const notificationModel = require('../models/Notification');
const service = require('../services/notificationServices');

 exports. updateNotificationPreference = async (req, res) => {
    const { preference, recipientEmail } = req.body;

    if (preference === 'on') {
      service.sendNotificationEmail(recipientEmail);
    }

    res.sendStatus(200);
  };
