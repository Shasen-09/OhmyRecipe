const express = require('express');
const { sendGroqMessage, userPreferences, getIngredientsByPreferences } = require('../controller/groqController');
const router = express.Router();


router.post('/groq', sendGroqMessage
);
router.post('/groq/user-preferences', userPreferences
);
router.post('/groq/get', getIngredientsByPreferences
);

module.exports = router;
