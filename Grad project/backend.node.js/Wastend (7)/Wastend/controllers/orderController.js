const Order = require('../models/Order');
const Meal = require('../models/Meal');
const User = require('../models/User');


// to make order
exports.placeOrder = async (req, res) => {
    const { mealId, quantity, paymentMethod, deliveryOption, userId  } = req.body;
    //const userId = req.user.id; // Assuming user ID is available in the req.user object
  
    try {
      const meal = await Meal.findById(mealId);
  
      if (!meal) {
        return res.status(404).json({ error: 'Meal not found' });
      }
  
      // Calculate total price based on meal price and quantity
      const totalPrice = meal.price * quantity;
  
      // Create a new order document with user ID
      const order = new Order({
        mealId,
        quantity,
        paymentMethod,
        deliveryOption,
        totalPrice,
        userId,
        paymentStatus : 'Success',
        status : 'Collected'
      });
  
      await order.save();
      await User.findByIdAndUpdate(userId, { $inc: { orderCount: quantity, mealsSaved: quantity , moneySaved: totalPrice} });
  
  
      res.status(200).json({ order });
    } catch (error) {
      console.error('Error placing order:', error);
      res.status(500).json({ error: 'An error occurred while placing the order' });
    }
};