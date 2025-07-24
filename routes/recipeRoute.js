const express = require('express');
const router = express.Router();

const { getPopularRecipes, searchByIngredients } = require('../controller/recipeController');

router.get('/popular-week', getPopularRecipes);
router.get('/search-by-ingredients', searchByIngredients);

module.exports = router;