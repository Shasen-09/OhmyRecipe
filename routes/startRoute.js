const express = require('express');
const { startController } = require('../controller/startController')
const router = express.Router();

router.get('/', startController)

module.exports = router;