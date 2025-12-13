const express = require('express');
const { registerController, loginController, verifyOtpController, homeController, sendOtpController, getMe, updateProfile, deleteAccount, updatePreferences } = require('../controller/userController');
const userMiddleware = require('../middlewares/userMiddleware');
const { forgotPasswordController, resetPasswordController } = require('../controller/passwordController');





const router = express.Router();

router.post('/register', registerController)
router.post('/login', loginController)
router.post('/verify', verifyOtpController)
router.post('/send-otp', sendOtpController)
router.post('/home', userMiddleware, homeController);
router.post('/forgot-password', forgotPasswordController);
router.post('/reset-password/:token', resetPasswordController);
router.get('/getProfile', userMiddleware, getMe)
router.put('/updateProfile', userMiddleware, updateProfile);
router.delete('/deleteaccount', userMiddleware, deleteAccount)
router.put('/preferences', userMiddleware, updatePreferences);




module.exports = router;