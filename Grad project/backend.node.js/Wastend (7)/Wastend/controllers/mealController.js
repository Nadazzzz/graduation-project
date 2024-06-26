const mongoose = require('mongoose');
const Meal = require('../models/Meal');
const Supplier = require('../models/Supplier');
const Store = require('../models/Store');

//create surprise bag 
exports.createSurpriseBag = async (req, res) => {
  const { name, description, category, price, quantityPerDay, dayOfWeek } = req.body;
  const supplierId = req.params.supplierId; // Retrieve the supplier ID from route parameters

  try {
    const supplier = await Supplier.findById(supplierId).populate('store');
    if (!supplier) {
      return res.status(404).json({ error: 'Supplier not found' });
    }

    const storeId = supplier.store._id; // Assuming the supplier has a storeId field

    const meal = new Meal({
      supplierId,
      store: storeId,
      name,
      description,
      category,
      price,
      Quantity: quantityPerDay,
      pickupDay: dayOfWeek,
      storeId, // Save the storeId in the meal document
      mealPhoto: req.file.filename
    });

    const createdMeal = await meal.save();

    res.status(201).json({meal_Id:createdMeal._id});
  } catch (error) {
    console.error('Error creating surprise bag:', error);
    res.status(500).json({ error: 'An error occurred while creating the surprise bag' });
  }
};

// view surprise bag for website 
exports.displaySurpriseBag = async (req, res) => {
  try {
    const supplierId = req.params.supplierId;

    // Find a random meal by the supplier ID
    const meal = await Meal.aggregate([
      { $match: { supplierId: new mongoose.Types.ObjectId(supplierId) } },
      { $sample: { size: 1 } },
    ]).exec();

    if (!meal || meal.length === 0) {
      return res.status(404).json({ error: 'Surprise bag not found' });
    }

    const { _id, name, description, price, mealPhoto, storeId, pickupDay, pickupTimes } = meal[0];
    const store = await Store.findById(storeId);
    const storeName = store ? store.name : 'Unknown Store'; // Assuming store has a 'name' property

    // Get the image name from the mealPhoto URL
    const imageName = mealPhoto.split('/').pop();

    // Construct the image URL in the desired format
    const imageUrl = `/uploads/${imageName}`;

    const surpriseBag = { _id, name, description, price, mealPhoto: imageUrl, storeName, pickupDay, pickupTimes };

    res.json(surpriseBag);
  } catch (error) {
    console.error('Error displaying surprise bag by supplier ID:', error);
    res.status(500).json({ error: 'An error occurred while displaying the surprise bag' });
  }
};
//view surprise bag for mob (home page).
exports.viewSurpriseBag = async (req, res) => {
  try {
    const meals = await Meal.find();

    const surpriseBags = await Promise.all(meals.map(async meal => {
      const { _id, name, description, price, mealPhoto, storeId,pickupDay,pickupTimes } = meal;
      const store = await Store.findById(storeId);
      const storeName = store ? store.name : 'Unknown Store'; // Assuming store has a 'name' property

      // Get the image name from the mealPhoto URL
      const imageName = mealPhoto.split('/').pop();

      // Construct the image URL in the desired format
      const imageUrl = `/uploads/${imageName}`;

      return { _id, name, description, price, mealPhoto: imageUrl, storeName,pickupDay,pickupTimes };
    }));

    res.json(surpriseBags);
  } catch (error) {
    console.error('Error displaying surprise bags:', error);
    res.status(500).json({ error: 'An error occurred while displaying the surprise bags' });
  }
};


// get meals by id (for mob ) to reserve
exports.getMealById = async (req, res) => {
  const { mealId } = req.params;

  try {
    const meal = await Meal.findById(mealId)
      .populate('store', 'name location ')
      .select('-supplierId -storeId -_id');

    if (!meal) {
      return res.status(404).json({ error: 'Meal not found' });
    }

    res.status(200).json(meal);
  } catch (error) {
    console.error('Error retrieving meal:', error);
    res.status(500).json({ error: 'An error occurred while retrieving the meal' });
  }
};

//get meals (map=>list) mob

// Base path for meal photos
const PHOTO_BASE_PATH = '/uploads/';

exports.getMealList = async (req, res) => {
  const option = req.query.option; // Option selected by the user
  try {
    let meals;
    if (option === 'Nearby') {
      const { Location } = req.query;
      if (!Location) {
        return res.status(400).json({ message: 'User location is required for Nearby option' });
      }
      // Parse user location coordinates
      const coordinates = Location.split(',').map(coord => parseFloat(coord.trim()));
      // Check if coordinates are within valid range
      if (coordinates.length !== 2 || isNaN(coordinates[0]) || isNaN(coordinates[1]) ||
          coordinates[0] < -180 || coordinates[0] > 180 || coordinates[1] < -90 || coordinates[1] > 90) {
        return res.status(400).json({ message: 'Invalid coordinates provided' });
      }
      
      // Retrieve meals near user's location
      const stores = await Store.find({
          storeLocation: {
              $near: {
                  $geometry: {
                      type: "Point",
                      coordinates: coordinates
                  },
                  $maxDistance: 1000 
              }
          }
      }).select('_id');

      const storeIds = stores.map(store => store._id);
      meals = await Meal.find({ store: { $in: storeIds } });

    } else if (option === 'Price') {
        meals = await Meal.find().sort({ price: 1 }); // Retrieve meals sorted by price
    } else if (option === 'Rating') {
        meals = await Meal.find().sort({ rating: -1 }); // Retrieve meals sorted by rating
    } else {
        return res.status(400).json({ message: 'Invalid option' });
    }

    // Include meal photo in the response with full URL
    const mealsWithPhotos = meals.map(meal => ({
      _id: meal._id,
      name: meal.name,
      supplierId: meal.supplierId,
      description: meal.description,
      category: meal.category,
      price: meal.price,
      available: meal.available,
      pickupDay: meal.pickupDay,
      Quantity: meal.Quantity,
      pickupTimes: meal.pickupTimes,
      createdDate: meal.createdDate,
      mealPhoto: `${PHOTO_BASE_PATH}${meal.mealPhoto}` // Construct the full URL for the meal photo
    }));
    
    res.status(200).json(mealsWithPhotos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


  

