const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');
const Supplier = require('../models/Supplier');
const Store = require('../models/Store');

// register and store type
exports.register = async (req, res) => {
    try {
      // Validate Request
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
  
      // Check if email exists
      const emailExists = await Supplier.exists({ email: req.body.email });
      if (emailExists) {
        return res.status(400).json({ errors: [{ msg: "Email already exists!" }] });
      }
  
      // Create Supplier
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      const supplier = new Supplier({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
        phone: req.body.phone,
        city: req.body.city,
        role: 'Supplier',
      });
      await supplier.save();
  
      // Create Store
      const store = new Store({
        name: req.body.name,
        storeType: req.body.storeType,
        supplier: supplier._id,
        storeLocation: {
          type: 'Point',
          coordinates: [req.body.longitude, req.body.latitude],
        },
        schedule: {
          pickupDays: [],
          pickupTimes: [],
        },
      });
      await store.save();
  
      // Update Supplier with Store ID
      supplier.store = store._id;
      await supplier.save();
  
      // Response
      const supplierData = supplier.toObject();
      supplierData.storeName = store.name;
      supplierData.storeType = store.storeType;
      delete supplierData.password;
      res.status(200).json(supplierData);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.message });
    }
  };


//login 
exports.login = async (req, res) => {
  try {
      // Validation of request body
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
      }

      // Check if email exists in the database
      const supplier = await Supplier.findOne({ email: req.body.email });
      if (!supplier) {
          return res.status(404).json({
              errors: [{ msg: 'Email or password not found!' }],
          });
      }

      // Compare hashed password
      const checkPassword = await bcrypt.compare(req.body.password, supplier.password);
      if (checkPassword) {
          // Password matches, fetch store details using storeId
          const store = await Store.findById(supplier.store);
          if (!store) {
              return res.status(404).json({
                  errors: [{ msg: 'Store not found!' }],
              });
          }

          // Return supplier data including supplierId, email, storeId, and storeName
          res.status(200).json({
              supplierId: supplier._id,
              email: supplier.email,
              storeId: supplier.store,
              storeName: store.name
          });
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


//search for your store 
exports.searchStore = async (req, res) => {
    const name = req.params.name;
    try {
        const store = await Store.findOne({ name: { $regex: new RegExp(name, 'i') } });
        if (!store) {
            return res.status(404).json({ message: 'Store not found' });
        }
        res.status(200).json(store.name);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



// review your details
exports.getStoreInfo = async (req, res) => {
    try {
        const supplierId = req.params.supplierId;
        const supplier = await Supplier.findById(supplierId).populate('store');

        // Check if the supplier exists
        if (!supplier) {
            return res.status(404).json({ message: 'Supplier not found' });
        }

        // If the supplier exists, retrieve the store information
        const storeName = supplier.store ? supplier.store.name : 'No store linked';
        const storeType = supplier.store ? supplier.store.storeType : 'No store linked';

        res.status(200).json({ storeName, storeType });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};



// account info 
exports.getAccount = async (req, res) => {
    try {
      const supplier = await Supplier.findById(req.params.id);
      res.status(200).json(supplier.email);  
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };