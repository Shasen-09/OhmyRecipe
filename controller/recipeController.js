const axios = require('axios');
const { response } = require('express');

const API = process.env.SPOONACULAR_API
console.log(API);

const getPopularRecipes = async (req, res) => {
  try {
    const response = await axios.get('https://api.spoonacular.com/recipes/random', {
      params: {
        apiKey: API,
        sort: 'popularity',
        number: 3,
      }
    });


    res.json(response.data);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Failed to fetch"
    })
  }
};

const searchByIngredients = async (req, res) => {
  try {
    const { ingredients } = req.query;

    if (!ingredients) {
      return res.status(400).json({ success: false, message: 'Ingredients query param is required' });
    }

    const response = await axios.get('https://api.spoonacular.com/recipes/findByIngredients', {
      params: {
        ingredients,
        number: 3,
        ranking: 1,
        ignorePantry: true,
        apiKey: API,
      }
    });

    res.json(response.data);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: 'Error in fetching'
    })
  }
};

const searchByRecipeSingleId = async (req, res) => {
  try {
    const { id } = req.query
    if (!id) {
      return res.status(400).json({
        success: false,
        message: 'Recipe ID is required'
      });
    }
    const response = await axios.get(`https://api.spoonacular.com/recipes/${id}/information`, {
      params: {
        apiKey: API
      }
    })
    res.json(response.data);

  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error to fetch by id"
    })
  }
}

const searchByRecipeMultipleId = async (req, res) => {

  try {
    const { ids } = req.query;
    if (!ids) {
      return res.status(400).json({
        success: false,
        message: 'Recipe IDs (comma-separated) are required'
      });
    }
    const response = await axios.get('https://api.spoonacular.com/recipes/informationBulk', {
      params: {
        ids,
        apiKey: API,
      }
    });
    res.json(response.data);

  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Recipe fetched unavailabe "
    })
  }
}

const complexSearch = async (req, res) => {
  try {
    const { includeIngredients, excludeIngredients, intolerances, diet } = req.query;

    const response = await axios.get('https://api.spoonacular.com/recipes/complexSearch', {
      params: {
        includeIngredients,
        excludeIngredients,
        intolerances,
        diet,
        apiKey: API,
      }
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Complex Search is not available at the moment"
    })
  }
}


module.exports = { getPopularRecipes, searchByIngredients, searchByRecipeSingleId, searchByRecipeMultipleId, complexSearch };