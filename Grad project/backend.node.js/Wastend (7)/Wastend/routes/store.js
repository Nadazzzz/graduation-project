const express = require('express');
const router = express.Router();
const storesController = require('../controllers/storesController');

//get storeinfo (for website)
router.get('/:storeId', storesController.getStoreInfo);



// Route for internal ref 
router.post('/:id', storesController.saveInternalReference); 


// Get stores by type route
router.get('/stores/:storeType', storesController.getStoresByType);



// Route for get stores meals for mob.
router.get('/stores-meals/:storeId', storesController.getStoreMeals);



module.exports = router;