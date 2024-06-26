const mongoose = require('mongoose');
const currentDateTime = new Date();
const orderSchema = new mongoose.Schema({
  userId: {
     type: mongoose.Schema.Types.ObjectId, ref: 'User', 
     required: true
     },
  mealId: {
     type: mongoose.Schema.Types.ObjectId, ref: 'Meal',
     required: true 
    },
  quantity: {
     type: Number,
     required: true,
     min: 1
     },
  totalPrice: {
     type: Number, 
     
     },
  orderDate: {
    type: Date,
     default: Date.now 
    },
  status: {
    type: String,
    enum: ['Pending', 'Collected', 'Cancelled'],
    default: 'Pending',
  },
  paymentMethod:{
    type: String,
    enum: ['Cash', 'Credit Card'],
    default: 'Cash'
  },
  paymentStatus: {
    type: String,
    enum: ['Pending', 'Success', 'Failed'],
    default: 'Pending'
  },
  paymentDate: {
    type: Date,
    default: Date.now
  },
});

const Order= mongoose.model('Order', orderSchema);
module.exports = Order;


