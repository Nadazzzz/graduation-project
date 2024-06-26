const User = require('../models/User');

exports.redeemReward = async (req, res) => {
    try {
      const userId = req.params.userId;
  
      // Retrieve the user from the database using the userId
      const user = await User.findById(userId);
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Check if the user has purchased enough meals to redeem the reward
      if (user.orderCount >= 6) {
        // Increment the current reward index
        user.currentRewardIndex += 1;
  
        // Reset the purchased meals count
        user.orderCount  = 0;
  
        // Save the updated user document
        await user.save();
  
        res.status(200).json({ message: 'Reward redeemed successfully' });
      } else {
        res.status(400).json({ message: 'Not enough purchased meals to redeem the reward' });
      }
    } catch (error) {
      console.error('Error redeeming reward:', error);
      res.status(500).json({ error: 'An error occurred while redeeming the reward' });
    }
  };

  //display
  exports.getRewards = async (req, res) => {
    try {
      // Retrieve the user from the database
      const userId = req.params.userId;
    
      // Retrieve the user from the database using the userId
      const user = await User.findById(userId);
  
      // Get the rewards array
      const rewards = [
        'Free Meal',
        'Discount 50% on meal',
        'Free Meal',
        'Discount 80% on meal',
        'Two Meals Free',
        'Discount 60% on meal',
        'Free Meal',
        'Discount 90% on meal',
      ];
  
      // Get the current reward index
      const currentRewardIndex = user.currentRewardIndex;
  
      // Return the rewards starting from the current index
      const availableRewards = rewards.slice(currentRewardIndex);
  
      res.status(200).json({ rewards: availableRewards });
    } catch (error) {
      console.error('Error retrieving rewards:', error);
      res.status(500).json({ error: 'An error occurred while retrieving rewards' });
    }
  };
  