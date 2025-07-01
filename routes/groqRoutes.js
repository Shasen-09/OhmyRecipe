const express = require('express');
const { sendGroqMessage } = require('../controller/groqController');
const router = express.Router();


router.get('/groq', sendGroqMessage
);

module.exports = router;
