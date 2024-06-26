const Store = require('../models/Store');
const User = require('../models/User');
const Order= require('../models/Order');
const Rating= require('../models/Rating');


exports. getPerformance  = async (req, res) => {
    try {
    const storeId = req.params.storeId;

    // Fetch the store by ID
    const store = await Store.findById(storeId);

    // If the store doesn't exist, return a 404 error
    if (!store) {
      return res.status(404).json({ message: 'Store not found' });
    }

    // Get the date for last 30 days, 12 weeks, and 12 months
    const last30DaysDate = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    const last12WeeksDate = new Date(Date.now() - 12 * 7 * 24 * 60 * 60 * 1000);
    const last12MonthsDate = new Date(Date.now() - 12 * 30 * 24 * 60 * 60 * 1000);

    // Function to calculate stats for a given period
    const calculateStatsForPeriod = async (startDate) => {
      // Fetch users who have interacted with the specified store in the specified period
      
      const users = await User.find({ createdAt: { $gte: startDate }, favoriteStores: storeId });

      // Calculate stats for the specified store based on user interactions
      const mealsSavedCount = users.reduce((total, user) => total + user.mealsSaved, 0);
      const impressionsCount = users.reduce((total, user) => total + user.impressions, 0);
      const favoriteUsersCount = users.length; // Total number of users that have marked the store as their favorite

      return { mealsSavedCount, impressionsCount, favoriteUsersCount };
    };

    // Calculate stats for each period
    const statsLast30Days = await calculateStatsForPeriod(last30DaysDate);
    const statsLast12Weeks = await calculateStatsForPeriod(last12WeeksDate);
    const statsLast12Months = await calculateStatsForPeriod(last12MonthsDate);

    res.json({
      storeId: store._id,
      storeName: store.name,
      last30Days: statsLast30Days,
      last12Weeks: statsLast12Weeks,
      last12Months: statsLast12Months
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
exports. getInsights = async(req, res)=> {
    try {
      const storeId = req.params.storeId;
  
      // Fetch the store by ID
      const store = await Store.findById(storeId);
  
      // If the store doesn't exist, return a 404 error
      if (!store) {
        return res.status(404).json({ message: 'Store not found' });
      }
  
      // Get the date for last 30 days, 12 weeks, and 12 months
      const last30DaysDate = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
      const last12WeeksDate = new Date(Date.now() - 12 * 7 * 24 * 60 * 60 * 1000);
      const last12MonthsDate = new Date(Date.now() - 12 * 30 * 24 * 60 * 60 * 1000);
  
      // Function to calculate stats for a given period
      const calculateStatsForPeriod = async (startDate) => {
        const orders = await Order.find({ orderDate: { $gte: startDate }, mealId: { $in: store.menu } });
        const ratings = await Rating.find({ storeId, createdAt: { $gte: startDate } });
        const cancellations = await Order.countDocuments({ storeId, orderDate: { $gte: startDate }, status: 'Cancelled' });
        function calculateOverallRating(ratings) {
            if (ratings.length === 0) {
              return 0; // No ratings available, return 0
            }
            const totalRating = ratings.reduce((sum, rating) => sum + rating.value, 0);
            const averageRating = totalRating / ratings.length;
            
            // Round average rating to two decimal places
            return Math.round(averageRating * 100) / 100;
          }
          function calculateSurpriseBagRating(ratings) {
            if (ratings.length === 0) {
              return 0; // No ratings available, return 0
            }
          
            const surpriseBagRatings = ratings.filter(rating => rating.type === 'surprise_bag');
          
            if (surpriseBagRatings.length === 0) {
              return 0; // No surprise bag ratings available, return 0
            }
          
            const totalRating = surpriseBagRatings.reduce((sum, rating) => sum + rating.value, 0);
            const averageRating = totalRating / surpriseBagRatings.length;
            
            // Round average rating to two decimal places
            return Math.round(averageRating * 100) / 100;
          }
          function calculateStoreExperienceRating(ratings) {
            if (ratings.length === 0) {
              return 0; // No ratings available, return 0
            }
          
            const storeExperienceRatings = ratings.filter(rating => rating.type === 'store_experience');
          
            if (storeExperienceRatings.length === 0) {
              return 0; // No store experience ratings available, return 0
            }
          
            const totalRating = storeExperienceRatings.reduce((sum, rating) => sum + rating.value, 0);
            const averageRating = totalRating / storeExperienceRatings.length;
            
            // Round average rating to two decimal places
            return Math.round(averageRating * 100) / 100;
          }
          
          
          
        // Calculate overall rating
        const overallRating = calculateOverallRating(ratings);
  
        // Calculate surprise bag rating
        const surpriseBagRating = calculateSurpriseBagRating(ratings);
  
        // Calculate store experience rating
        const storeExperienceRating = calculateStoreExperienceRating(ratings);
  
        return {
          overallRating,
          surpriseBagRating,
          storeExperienceRating,
          cancellations
        };
      };
  
      // Calculate stats for each period
      const statsLast30Days = await calculateStatsForPeriod(last30DaysDate);
      const statsLast12Weeks = await calculateStatsForPeriod(last12WeeksDate);
      const statsLast12Months = await calculateStatsForPeriod(last12MonthsDate);
  
      res.json({
        storeId: store._id,
        storeName: store.name,
        last30Days: statsLast30Days,
        last12Weeks: statsLast12Weeks,
        last12Months: statsLast12Months
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  