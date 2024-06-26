const mongoose = require('mongoose');

const moneyDonationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId, ref: 'User', 
    required: true
    },
  amount: {
    type: Number,
    required: true
  },
  cardId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Card',
    required: true
  }
});

const MoneyDonation = mongoose.model('MoneyDonation', moneyDonationSchema);

module.exports = MoneyDonation;