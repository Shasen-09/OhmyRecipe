const express = require('express');
const { registerController, loginController, verifyOtpController, homeController, sendOtpController } = require('../controller/userController');
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



module.exports = router;