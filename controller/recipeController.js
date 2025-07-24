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
        number: 9,
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
        number: 10,
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


module.exports = { getPopularRecipes, searchByIngredients };