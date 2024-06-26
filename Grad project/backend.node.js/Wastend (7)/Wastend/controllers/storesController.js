const Store = require('../models/Store');
const Supplier = require('../models/Supplier');
const Meal = require('../models/Meal');

//get storeinfo (website)
exports.getStoreInfo = async (req, res) => {
  try {
    const storeId = req.params.storeId;
    //console.log("Store ID:", storeId);

    // Find the store by ID
    const store = await Store.findById(storeId);
    //console.log("Store:", store);
    if (!store) {
      return res.status(404).json({ message: 'Store not found' });
    }

    // Find the supplier associated with the store
    const supplier = await Supplier.findOne({ store: storeId });
    //console.log("Supplier:", supplier);
    if (!supplier) {
      return res.status(404).json({ message: 'Supplier not found for this store' });
    }

    // Construct the response object
    const storeInfo = {
      storeName: store.name,
      storeType: store.storeType,
      storeLocation: store.storeLocation,
      supplierPhone: supplier.phone,
      supplierEmail: supplier.email,
    };

    res.status(200).json(storeInfo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};


// internal ref
exports.saveInternalReference = async (req, res) => {
  try {
    const { id, internalReference } = req.body;
    const store = await Store.findByIdAndUpdate(
      id,
      { internalReference },
      { new: true }
    );
    res.status(200).json(store.internalReference);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



// get stores by storetype (categories) (for mob)
exports.getStoresByType = async (req, res) => {
  const storeType = req.params.storeType;
  try {
      const store = await Store.find({ storeType } , 'name storeLocation');
      if (!store) {
          return res.status(404).json({ message: 'Store not found' });
      }
      res.status(200).json(store);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
};


// get stores meals (for mob) for store
exports.getStoreMeals = async (req, res) => {
  const  storeId  = req.params.storeId;

  try {
    const store = await Store.findById(storeId);

    if (!store) {
      return res.status(404).json({ error: 'Store not found' });
    }

    const meals = await Meal.find({ storeId });

    res.status(200).json(meals);
  } catch (error) {
    console.error('Error retrieving store meals:', error);
    res.status(500).json({ error: 'An error occurred while retrieving store meals' });
  }
};







