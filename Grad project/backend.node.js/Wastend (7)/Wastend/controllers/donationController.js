const Donation = require('../models/Donation');
const Card = require('../models/Card');
const MoneyDonation = require('../models/MoneyDonation');
const User = require('../models/User');

// donate by food
exports.createDonation = async (req, res) => {
  const { title, description, foodCategory, expirationDate, quantity } = req.body;
  const userId = req.params.userId; // Assuming the user ID is passed as a route parameter

  try {
    const donation = new Donation({
      title,
      description,
      foodCategory,
      expirationDate,
      quantity,
      userId // Assign the user ID to the donation object
    });

    const createdDonation = await donation.save();
    res.status(201).json(createdDonation);
  } catch (error) {
    console.error('Error creating donation:', error);
    res.status(500).json({ error: 'An error occurred while creating the donation' });
  }
};
// donate by money
exports.createMonetaryDonation = async (req, res) => {
  const userId = req.params.userId;
  const { amount, cardId } = req.body;
  try {
    const card = await Card.findById(cardId);

    if (!card) {
      return res.status(404).json({ error: 'Card not found' });
    }

    // Deduct the donated amount from the card balance
    card.balance -= amount;
    await card.save();

    const moneyDonation = new MoneyDonation({
      userId,
      amount,
      cardId
    });
    const createdDonation = await moneyDonation.save();
    res.status(201).json(createdDonation);
  } catch (error) {
    console.error('Error creating monetary donation:', error);
    res.status(500).json({ error: 'An error occurred while creating the monetary donation' });
  }
};