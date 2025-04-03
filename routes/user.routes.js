const express = require('express')
const router = express.Router()
const userController = require('../controllers/user.controller')
const {body} = require('express-validator')
const authMiddleware = require('../middlewares/auth.middlewares')
const upload = require('../middlewares/multer.middlewares')

router.post('/register', [
        body('email').isEmail().withMessage('Invalid Email'),
        body('password').isLength({min : 4}).withMessage('Password must be atleast 4')
    ]
    ,userController.registerUser)

router.post('/login',[
    body('email').isEmail().withMessage('Invalid Email'),
    body('password').isLength({min : 4}).withMessage('Password must be atleast 4')
],
userController.loginUser)

router.get('/profile',authMiddleware.authUser,userController.getProfile)

router.get('/logout',authMiddleware.authUser,userController.logoutUser)

router.get('/search',userController.searchUser)

router.post('/update_friend',userController.updateFriend)

router.get('/find_User',userController.findProfile)

router.get('/fetch_message',userController.fetchMessage)

router.get('/fetch_last_message',userController.fetchLastMessage)

router.post('/profile_pic',upload.single('profilePic'),userController.updateProfilePic)

module.exports = router