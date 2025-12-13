const express = require('express');
const { startController } = require('../controller/startController')
const router = express.Router();

router.get('/start', startController)

module.exports = router;