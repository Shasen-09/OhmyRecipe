const express = require('express');
const router = express.Router();

const { getPopularRecipes } = require('../controller/recipeController');

router.get('/popular-week', getPopularRecipes);

module.exports = router;