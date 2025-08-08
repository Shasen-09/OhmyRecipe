const express = require('express');
const router = express.Router();

const { getPopularRecipes, searchByIngredients, complexSearch, searchByRecipeMultipleId, searchByRecipeSingleId } = require('../controller/recipeController');

router.get('/popular-week', getPopularRecipes);
router.get('/search-by-ingredients', searchByIngredients);
router.get('/searchSingleID', searchByRecipeSingleId);
router.get('/searchMultipleId', searchByRecipeMultipleId);
router.get('/complexSearch', complexSearch);

module.exports = router;