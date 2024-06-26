const nodemailer = require('nodemailer');

exports.sendNotificationEmail = async (recipientEmail) => {
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'Wastendprojrct@gmail.com',
      pass: 'wastend2024'
    }
  });
  const mailOptions = {
    from: 'Wastendprojrct@gmail.com',
    to: 'aminanasser103@gmail.com',
    subject: 'Notification',
    text: 'This is a notification message.'
  };
  try {
    await transporter.sendMail(mailOptions);
    console.log('Notification email sent successfully');
  } catch (error) {
    console.error('Error sending notification email:', error);
  }
};
