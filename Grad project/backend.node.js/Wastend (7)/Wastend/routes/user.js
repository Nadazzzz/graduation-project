const router = require("express").Router();
const userController = require('../controllers/userController');
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


//Route for register 
router.post('/register',upload.single('photo'), userController.registerUser);


//Route for login
router.post('/login', userController.loginUser);


//Route for show account information
router.get('/account-info/:userId', userController.getUserAccountInfo);


//Route for profile 
router.get('/profile/:userId', userController.getProfile);


//Route for update profile 
router.put('/update-profile/:userId', userController.updateUserAccountInfo);


// Route for delete account
router.delete('/:userId', userController.deleteUser);


//Route for change password
router.put('/change-password/:userId', userController.changeUserPassword);


//route for add to fav
router.post('/addToFavorites', userController.addToFavorites);


// route to get all fav 
router.get('/favoriteMeals/:userId', userController.getFavoriteMeals); 


module.exports = router;