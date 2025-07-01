const express = require('express');
const { registerController, loginController, verifyOtpController, homeController } = require('../controller/userController');
const userMiddleware = require('../middlewares/userMiddleware');





const router = express.Router();

router.post('/register', registerController)
router.post('/login', loginController)
router.post('/verify', verifyOtpController)
router.post('/home', userMiddleware, homeController);


module.exports = router;