const axios = require('axios');

const API = process.env.SPOONACULAR_API
console.log(API);

const getPopularRecipes = async (req, res) => {
  try {
    const response = await axios.get('https://api.spoonacular.com/recipes/random', {
      params: {
        apiKey: API,
        sort: 'popularity',
        number: 10,
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

module.exports = { getPopularRecipes };