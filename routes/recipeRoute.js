const express = require('express');
const router = express.Router();

const { getPopularRecipes, searchByIngredients, searchByRecipe, complexSearch } = require('../controller/recipeController');

router.get('/popular-week', getPopularRecipes);
router.get('/search-by-ingredients', searchByIngredients);
router.get('/search-by-recipes', searchByRecipe);
router.get('/complexSearch', complexSearch);

module.exports = router;