const User = require('../models/User');
const Card = require('../models/Card');


exports.addPaymentCard = async (req, res) => {
  const { userId } = req.params;  
  const { holderName, cardNumber, expirationDate, cvc } = req.body;
    
  
    try {
      const user = await User.findById(userId);
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      const card = new Card({
        holderName,
        cardNumber,
        expirationDate,
        cvc,
        user: userId
      });
  
      const createdCard = await card.save();
  
      user.cardId = createdCard._id;
      await user.save();
      createdCard.userId = userId; // Assign the userId to the createdCard object
  
      res.status(201).json(createdCard);
    } catch (error) {
      console.error('Error adding payment card:', error);
      res.status(500).json({ error: 'An error occurred while adding the payment card' });
    }
  };