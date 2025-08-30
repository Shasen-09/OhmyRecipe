import React from 'react';
import { useRecipes } from '../../context/RecipeContext';
import NavBAr from '../NavBAr.jsx';
import { useNavigate } from 'react-router-dom';

const Bookmarks = () => {
  const { bookmarks, toggleBookmark } = useRecipes();
  const navigate = useNavigate();



  return (
    <>
      <NavBAr />
      <div className="p-5">
        <h1 className="text-2xl font-bold mb-4">Bookmarked Recipes</h1>
        <ul className="list-none p-0">
          {bookmarks.map((recipe) => (
            <li
              key={recipe.id}
              className="border border-gray-300 rounded-lg mb-4 p-4 flex justify-between items-center"
            >
              <div
                className="cursor-pointer"
                onClick={() => navigate(`/recipe/${recipe.id}`, { state: { recipeDetails: recipe } })}
              >
                <h3 className="text-lg font-semibold">{recipe.title}</h3>
                {/* Optional: Add image or short description */}
              </div>

              <button
                onClick={() => toggleBookmark(recipe)}
                className="bg-red-500 text-white rounded px-3 py-1 cursor-pointer hover:bg-red-600 transition-colors duration-200"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Bookmarks;
