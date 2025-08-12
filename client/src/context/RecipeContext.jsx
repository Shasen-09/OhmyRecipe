import { createContext, useContext, useState } from 'react';

const RecipeContext = createContext();

export function RecipeProvider({ children }) {
  const [recipes, setRecipes] = useState([]);
  const [recipeDetails, setRecipeDetails] = useState([]);
  const [ingredients, setIngredients] = useState({});
  const [preferencesData, setPreferencesData] = useState(null);
  const [preferences, setPreferences] = useState({
    allergies: '',
    diet: '',
    dislikes: ''
  });

  return (
    <RecipeContext.Provider value={{ recipes, setRecipes, recipeDetails, setRecipeDetails, ingredients, setIngredients, preferencesData, setPreferencesData, preferences, setPreferences }}>
      {children}
    </RecipeContext.Provider>
  );
}

export function useRecipes() {
  return useContext(RecipeContext);
}

export default RecipeContext;
