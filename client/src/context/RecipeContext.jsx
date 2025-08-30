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

  const [bookmarks, setBookmarks] = useState([]);

  const toggleBookmark = (recipe) => {
    setBookmarks((prev) => {
      if (prev.find((item) => item.id === recipe.id)) {
        return prev.filter((item) => item.id !== recipe.id);
      } else {
        return [...prev, recipe];
      }
    });
  };
  const isBookmarked = (id) => bookmarks.some((item) => item.id === id);

  return (
    <RecipeContext.Provider value={{
      recipes, setRecipes, recipeDetails, setRecipeDetails, ingredients, setIngredients, preferencesData, setPreferencesData, preferences, setPreferences, bookmarks,
      toggleBookmark,
      isBookmarked,
    }}>
      {children}
    </RecipeContext.Provider>
  );
}

export function useRecipes() {
  return useContext(RecipeContext);
}

export default RecipeContext;
