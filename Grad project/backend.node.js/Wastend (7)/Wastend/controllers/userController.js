const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');
const User = require('../models/User');

//Register
exports.registerUser = async (req, res) => {
  try {
  const { password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  
  const user = new User({ 
    name: req.body.name,
    email: req.body.name,
    phone: req.body.phone,
    password: hashedPassword,
    mealsSaved: 0,
    moneySaved: 0,
    location:{
      type: 'Point',
      coordinates: [req.body.longitude, req.body.latitude],
  },
    photo: req.file.filename
  });
  await user.save();
  
  res.status(201).json(user);
  } catch (error) {
  console.error('Error during registration:', error);
  res.status(500).json({ message: 'Internal server error' });
  }
  };

//login 
exports.loginUser = async (req, res) => {
    try {
      // Validate the request body
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
  
      // Check if email exists in the database
      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        return res.status(404).json({
          errors: [{ msg: 'Email or password not found!' }],
        });
      }
  
      // Compare hashed password
      const checkPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (checkPassword) {
        // Password matches, return user data
        res.status(200).json({userId: user._id, email: user.email }); // You can customize the returned data as needed
      } else {
        // Password does not match
        res.status(404).json({
          errors: [{ msg: 'Email or password not found!' }],
        });
      }
    } catch (err) {
      // Internal server error
      res.status(500).json({ err: err.message });
    }
};



// profile 
exports.getProfile = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId).select('name email photo mealsSaved moneySaved');
    // Check if the user exists
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // If the user exists, retrieve the account information
    const username = user.name;
    const email = user.email;
    const photo = user.photo;
    const mealsSaved = user.mealsSaved;
    const moneySaved = (0.5) * user.moneySaved;

    res.status(200).json({ username, email, photo, mealsSaved, moneySaved });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};


// show account info
exports.getUserAccountInfo = async (req, res) => {
    try {
      const userId = req.params.userId;
      const user = await User.findById(userId);
  
      // Check if the user exists
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // If the user exists, retrieve the account information
      const username = user.name;
      const email = user.email;
      const phone = user.phone;
      const location = user.location;
  
      res.status(200).json({ username, email, phone, location });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
};



//delete account 
exports.deleteUser = async (req, res) => {
    try {
      const userId = req.params.userId;
      const user = await User.findByIdAndDelete(userId);
  
      // Check if the user exists
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // If the user exists, delete the user and return a success message
      res.status(200).json({ message: 'User account deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
};


// change password 
exports.changeUserPassword = async (req, res) => {
    try {
      const userId = req.params.userId;
      const newPassword = req.body.newPassword;
  
      // Find the user in the database
      const user = await User.findById(userId);
  
      // Check if the user exists
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // If the user exists, update the user's password
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedPassword;
      await user.save();
  
      // If the password is updated successfully, return a success message
      res.status(200).json({ message: 'Password changed successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
};



// update profile 
exports.updateUserAccountInfo = async (req, res) => {
  try {
    const userId = req.params.userId;
    const { name, email, phone, city } = req.body;

    // Find the user by ID
    const user = await User.findById(userId);

    // Check if the user exists
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update the user's account information
    user.name = name;
    user.email = email;
    user.phone = phone;
    user.city = city;

    await user.save();

    res.status(200).json({ message: 'Profile updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};



// add to fav.
exports.addToFavorites = async (req, res) => {
  const { userId, mealId } = req.body;

  try {
      const user = await User.findById(userId);
      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }

      // Check if the meal is already in favorites
      if (user.favoriteMeals.includes(mealId)) {
          return res.status(400).json({ message: 'Meal already in favorites' });
      }

      // Add meal to favorites
      user.favoriteMeals.push(mealId);
      await user.save();

      res.status(200).json({ message: 'Meal added to favorites' });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
  }
};


// get all fav.
exports.getFavoriteMeals = async (req, res) => {
  const userId = req.params.userId;

  try {
      const user = await User.findById(userId).populate('favoriteMeals', 'name description price available pickupDay pickupTimes');
      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }

      if (user.favoriteMeals.length === 0) {
          return res.status(200).json({ message: 'No favorite meals found' });
      }

      // Extracting required fields from favoriteMeals
      const favoriteMealsData = user.favoriteMeals.map(meal => ({
          name: meal.name,
          description: meal.description,
          price: meal.price,
          available: meal.available,
          pickupDay: meal.pickupDay,
          pickupTimes: meal.pickupTimes
      }));

      res.status(200).json(favoriteMealsData);
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
  }
};











