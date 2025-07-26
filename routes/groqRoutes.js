const express = require('express');
const { sendGroqMessage, userPreferences } = require('../controller/groqController');
const router = express.Router();


router.post('/groq', sendGroqMessage
);
router.post('/groq/user-preferences', userPreferences
);


module.exports = router;
