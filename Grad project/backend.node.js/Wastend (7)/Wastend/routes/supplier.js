const router = require("express").Router();
const suppliercontroller = require("../controllers/supplierController")


//Route for register
router.post('/register', suppliercontroller.register);
  
//Route for login
router.post('/login', suppliercontroller.login);


// Route for Search for a store by name
router.get('/search/:name', suppliercontroller.searchStore);


// Route for review your details
router.get('/store-info/:supplierId', suppliercontroller.getStoreInfo);


// Route for account info 
router.get('/:id', suppliercontroller.getAccount);

module.exports = router;