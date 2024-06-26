const express = require('express');
const router = express.Router();
const mealController = require('../controllers/mealController');
const multer = require('multer');
const diskStorage = multer.diskStorage({
        destination: function (req, file, cb){
        console.log("FILE", file);
        cb(null, 'uploads');
    },
        filename: function (req, file, cb) {
        const ext = file.mimetype.split('/')[1];
        const fileName = `user-${Date.now()}.${ext}`;
        cb(null, fileName);
    }
})
const upload = multer({ storage: diskStorage});

// Route for creating a surprise bag
router.post('/:supplierId',upload.single('mealPhoto'), mealController.createSurpriseBag);


//Route for view surprise bag for mob.
router.get('/surprise-bag', mealController.viewSurpriseBag);


// Route for displaying a surprise bag
router.get('/display/:supplierId', mealController.displaySurpriseBag);


// Route for // get meals by id (for mob ) to reserve
router.get('/meals/:mealId', mealController.getMealById);


//Route for the list function (mob)
//For Postman option nearby (/meals?option=Nearby&Location=123.4194,78.902)
//For price and rating optons (/meals?option=Price) or (/meals?option=Rating)
router.get('/meals', mealController.getMealList);

module.exports = router;