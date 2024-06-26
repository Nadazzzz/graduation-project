const mongoose = require('mongoose');
const { Schema } = mongoose;

const cardSchema = new mongoose.Schema({
  cardNumber: {
    type: String,
    required: true,
    unique: true
  },
  holderName: {
    type: String,
    required: true
  },
  balance: {
    type: Number,
    default: 0
  },
  expirationDate:{
    type: String,
    required: true
  },
  cvc:{
    type: Number,
  },
  user:{
      type: Schema.Types.ObjectId,
        ref:'User',

  }
});

const Card = mongoose.model('Card', cardSchema);

module.exports = Card;