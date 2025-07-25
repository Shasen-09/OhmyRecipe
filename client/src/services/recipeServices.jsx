import axios from "axios";

const popularWeekServices = async () => {
  const response = await axios.get('/api/recipes/popular-week', {
    headers: {
      'Content-Type': 'application/json'
    }
  });
  return response;
}



const userInputServices = async (message) => {
  const response = await axios.post('/api/groq', { message }, {
    headers: {
      'Content-Type': 'application/json'
    }
  });
  return response;
}


const recipesByIngredients = async (ingredients) => {
  const ingredientsQuery = Object.keys(ingredients).join(',');
  return axios.get('/api/recipes/search-by-ingredients', {
    params: { ingredients: ingredientsQuery }
  });
};



const recipeServices = { popularWeekServices, userInputServices, recipesByIngredients }
export default recipeServices;