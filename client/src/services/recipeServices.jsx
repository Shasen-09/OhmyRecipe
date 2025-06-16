import axios from "axios";

const popularWeekServices = async () => {
  const response = await axios.get('/api/recipes/popular-week', {
    headers: {
      'Content-Type': 'application/json'
    }
  });
  return response;
}

const recipeServices = { popularWeekServices }
export default recipeServices;