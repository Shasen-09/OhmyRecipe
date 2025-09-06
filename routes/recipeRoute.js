const express = require('express');
const router = express.Router();

const { getPopularRecipes, searchByIngredients, complexSearch, searchByRecipeMultipleId, searchByRecipeSingleId, ingredientsById, nutrientsById, classifyTaste, classifyCuisine, similarRecipes, getEquipment } = require('../controller/recipeController');

router.get('/popular-week', getPopularRecipes);
router.get('/search-by-ingredients', searchByIngredients);
router.get('/searchSingleID', searchByRecipeSingleId);
router.get('/searchMultipleId', searchByRecipeMultipleId);
router.get('/complexSearch', complexSearch);
router.get('/ingredientsById', ingredientsById);
router.get('/nutrientsById', nutrientsById);
router.get('/tasteById', classifyTaste);
router.post('/CuisineByTitle', classifyCuisine);
router.get('/similarRecipes', similarRecipes);
router.get('/EquipmentbyId', getEquipment);

module.exports = router;