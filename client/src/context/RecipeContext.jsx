import { createContext, useContext, useState, useEffect } from 'react';
import bookmarkServices from '../services/bookmarkServices';

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


  useEffect(() => {
    const fetchBookmarks = async () => {
      const data = await bookmarkServices.getBookmarks();
      if (data) setBookmarks(data);
    };
    fetchBookmarks();
  }, []);

  const toggleBookmark = async (recipe) => {
    const exists = bookmarks.find((item) => item.id === recipe.id);
    let updatedBookmarks;

    if (exists) {
      updatedBookmarks = await bookmarkServices.removeBookmark(recipe.id);
    } else {
      updatedBookmarks = await bookmarkServices.addBookmark(recipe);
    }

    if (updatedBookmarks) setBookmarks(updatedBookmarks);
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
