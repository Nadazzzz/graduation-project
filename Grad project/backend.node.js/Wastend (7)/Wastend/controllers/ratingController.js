const Rating = require('../models/Rating');
const Meal = require('../models/Meal');

exports.submitRating = async (req, res) => {
  try {
    const { score, comments } = req.body;
    const { userId, mealId } = req.params;

    // Retrieve the meal from the database
    const meal = await Meal.findById(mealId);

    if (!meal) {
      return res.status(404).json({ message: 'Meal not found' });
    }

    const { category } = meal;

    const rating = new Rating({
      meal: mealId,
      score,
      comments,
      user: userId,
      category,
      timestamp: new Date()
    });
    await rating.save();

    // Associate the rating with the meal
    meal.ratings.push(rating._id);
    await meal.save();

    res.status(201).json({ message: 'Rating submitted successfully' });
  } catch (error) {
    console.error('Error during rating submission:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};