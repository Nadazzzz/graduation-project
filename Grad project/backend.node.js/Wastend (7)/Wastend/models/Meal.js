const mongoose = require('mongoose');
const { Schema } = mongoose;

const mealSchema = new Schema({
  supplierId: { 
    type: Schema.Types.ObjectId,
    ref: 'Supplier',
    required: true 
  },
  storeId: {
    type: Schema.Types.ObjectId,
    ref: 'Store',
  },
  store: {
    type: Schema.Types.ObjectId,
    ref: 'Store',
  },
  ratings: [{
    type: Schema.Types.ObjectId,
    ref: 'Rating',
  }],
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: ['fruits and vegetables', 'meat', 'Seafood', 'Pizza', 'Pasta', 'Burgers', 'Sandwiches', 'Salads', 'Soups', 'Beverages', 'Desserts', 'Baked']
  },
  price: {
    type: Number,
    required: true
  },
  mealPhoto: {
    type: String,
    default: '..uploads/meal.png'
  },
  available: {
    type: Boolean,
    default: true
  },
  pickupDay: {
    type: String,
    enum: ['Sun', 'Mon', 'Tue', 'Wen', 'Thu', 'Fri', 'Sat'],
    required: true
  },
  Quantity: { //perday
    type: Number,
  },
  pickupTimes: [String],
  createdDate: {
    type: Date,
    default: Date.now
  }
});

const Meal = mongoose.model('Meal', mealSchema);
module.exports = Meal;