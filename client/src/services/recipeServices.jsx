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

const userPreferences = async (message) => {
  const response = await axios.post('/api/groq/user-preferences', { message }, {
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

const getFinalRecipe = async (userPreferencesData) => {
  const response = await axios.get('/api/recipes/complexSearch', {
    params: userPreferencesData,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return response;
};

const getDetailsById = async (ids) => {
  const response = await axios.get('/api/recipes/searchMultipleId', {
    params: { ids },
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response;
}

const getNutrientsDetails = async (id) => {
  const response = await axios.get('/api/recipes/nutrientsById', {
    params: { id },
    headers: {
      'Content-Type': 'application/json'
    }
  })
  return response;
}

const getTaste = async (id) => {
  const response = await axios.get('/api/recipes/tasteById', {
    params: { id },
    headers: {
      'Content-Type': 'application/json'
    }
  })
  return response;
}

const getCuisine = async (title,
  ingredientList,
  language = "en") => {
  const response = await axios.post('/api/recipes/CuisineByTitle', {
    title,
    ingredientList,
    language
  })
  return response
}

const getSimilarRecipes = async (id) => {
  const response = await axios.get('/api/recipes/similarRecipes', {
    params: { id },
    headers: {
      'Content-Type': 'application/json'
    }
  }

  )
  return response
}

const getEquipment = async (id) => {
  const response = await axios.get('/api/recipes/EquipmentbyId', {
    params: { id },
    headers: {
      'Content-Type': 'application/json'
    }
  })
  return response
}
const recipeDetailsbyId = async (id) => {
  const response = await axios.get('/api/recipes/searchSingleID', {
    params: { id },
    headers: {
      'Content-Type': 'application/json'
    }
  })
  return response
}

const getRecipesbyName = async (query) => {
  const response = await axios.get('/api/recipes/recipeSearch', {
    params: { query },
    headers: {
      'Content-Type': 'application/json'
    }
  })
  return response
}

const getIngredientInfo = async (query) => {
  const response = await axios.get('/api/recipes/ingredientInfo', {
    params: { query },
    headers: {
      "Content-Type": 'application/json'
    }
  })
  return response
}

const recipeServices = { popularWeekServices, userInputServices, recipesByIngredients, userPreferences, getFinalRecipe, getDetailsById, getNutrientsDetails, getTaste, getCuisine, getSimilarRecipes, getEquipment, recipeDetailsbyId, getRecipesbyName, getIngredientInfo }
export default recipeServices;