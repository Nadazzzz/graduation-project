const mongoose = require('mongoose');
const { Schema } = mongoose;
const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: { 
        type: String ,
        required: true ,
        unique: [true, "Email must be unique"] 
    }, 
    password:{
         type: String,
         required: true,
         minlength: [8, 'Password should have atleast 8 characters']
    },
    phone: {
        type: String,
        required: true
    },
    role:{
        type: String,
        required: true,
        enum: ['Admin', 'User', 'Supplier'],
        default:'User'
    },
     location: {
        type: {
            type: String,
            enum: ['Point'],
            default: 'Point',
        },
        coordinates: {
            type: [Number],
            index: '2dsphere' // Create geospatial index
        }
    },
    accountImage: {
        type: String,
},
    moneySaved:{
        type: Number,
        defaultValue: 0,
      },
    mealsSaved: {
        type: Number,
        defaultValue: 0,
  },
  card:{
        type: Schema.Types.ObjectId,
        ref:'Card',
  },
  favoriteMeals: [
    { type: mongoose.Schema.Types.ObjectId, 
        ref: 'Meal' }
    ],
    orderCount: {
        type: Number,
        default: 0
      },
      currentRewardIndex: {
        type: Number,
        default: 0,
      },
      photo: {
        type: String,
        default:'..uploads/default.png'
      },
      
})

const User= mongoose.model('User', userSchema);
module.exports = User;