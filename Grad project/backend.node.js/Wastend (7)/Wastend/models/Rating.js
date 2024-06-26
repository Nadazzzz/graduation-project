const mongoose = require('mongoose');
const { Schema } = mongoose
const ratingSchema = new Schema({
  meal: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Meal',
  },
  score: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  comments: {
    type: String
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  category: {
    type: String,
    enum: ['fruits and vegetables', 'meat', 'Seafood', 'Pizza', 'Pasta', 'Burgers', 'Sandwiches', 'Salads', 'Soups', 'Beverages', 'Desserts', 'Baked'],
    
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
})
const Rating= mongoose.model('Rating', ratingSchema);
 module.exports =  Rating;


