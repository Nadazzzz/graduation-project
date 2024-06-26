const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId, ref: 'User', 
    required: true
    },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  foodCategory: {
    type: String,
    required: true
  },
  expirationDate: {
    type: Date,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  }
});


const Donation = mongoose.model('Donation', donationSchema);

module.exports = Donation