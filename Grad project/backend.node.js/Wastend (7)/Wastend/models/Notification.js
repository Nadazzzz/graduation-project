const mongoose = require('mongoose');
const notificationSchema = new mongoose.Schema({
  userId:
   { type: mongoose.Schema.Types.ObjectId, ref: 'User',
   required: true 
},
  content: String,
  read: { 
    type: Boolean,
    default: false },
});

 const Notification = mongoose.model('Notification', notificationSchema);
 module.exports = Notification;

