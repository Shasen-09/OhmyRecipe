import React, { useState } from 'react';
import recipeServices from '../../services/recipeServices';
import { ImCross } from "react-icons/im";
import { FaArrowRight } from "react-icons/fa";
import pluralize from 'pluralize';
import { useNavigate } from 'react-router-dom';
import { useRecipes } from '../../context/RecipeContext';
import Dropdown from './Dropdown'
import { KNOWN_ALLERGIES, KNOWN_DIETS } from '../../constants/knownPrefernces';



const UserInput = () => {
  const { recipes, setRecipes, recipeDetails, setRecipeDetails, ingredients, setIngredients, preferencesData, setPreferencesData, preferences, setPreferences } = useRecipes();
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [popupmodal, setPopupmodal] = useState(false);




  const navigate = useNavigate();

  const deleteIngredient = (key) => {
    const updatedIngredient = { ...ingredients };
    delete updatedIngredient[key];

    setIngredients(updatedIngredient);

  }

  const fetchPreferences = async () => {
    if (!ingredients || Object.keys(ingredients).length === 0) {
      alert('Please extract ingredients first');
      return;
    }
    setLoading(true);
    try {
      const allergies = preferences.allergies.map(a => ({ name: a })) || [];
      const dietPreferences = preferences.diet ? [preferences.diet] : [];
      const dislikes = preferences.dislikes ? preferences.dislikes.split(',').map(d => d.trim()) : [];

      const restrictedKeywords = [
        ...allergies.map(a => pluralize.singular(a.name)),
        ...dislikes.map(d => pluralize.singular(d))
      ];

      const filteredIngredients = Object.entries(ingredients).reduce((acc, [key, value]) => {
        const singularKey = pluralize.singular(key);
        const hasConflict = restrictedKeywords.some(r => singularKey.includes(r));
        if (!hasConflict) acc[singularKey] = value;
        return acc;
      }, {});

      const removed = Object.keys(ingredients).filter(key =>
        restrictedKeywords.some(r => pluralize.singular(key).includes(r))
      );
      if (removed.length > 0) {
        alert(`Removed due to preferences: ${removed.join(", ")}`);
      }

      setIngredients(filteredIngredients);
      setPreferencesData({
        allergies,
        dietPreferences,
        dislikes
      });
      setPopupmodal(false);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchRecipes = async () => {
    if (!ingredients || Object.keys(ingredients).length === 0) {
      alert('Please extract ingredients first');
      return;
    }
    setLoading(true);
    try {
      console.log('ingredients before fetchRecipes:', ingredients);
      console.log('preferencesData before finalRecipe:', preferencesData);


      const res = await recipeServices.recipesByIngredients(ingredients);
      console.log('fetchRecipes response:', res.data);
      setRecipes(res.data || []);
      setPopupmodal(true);
    } catch (err) {
      console.error('fetchRecipes error:', err);
    } finally {
      setLoading(false);
    }
  };


  const handleSubmit = async () => {
    if (!input.trim()) return alert('Please put your ingredients list');
    setLoading(true);
    try {
      const res = await recipeServices.userInputServices(input);
      setIngredients(res.data.ingredients);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const finalRecipe = async () => {
    if (!preferencesData) return;
    setLoading(true);

    try {
      const userPreferencesData = {
        includeIngredients: Object.keys(ingredients)
          .map(i => pluralize.singular(i).toLowerCase())
          .join(",") || "None",
        excludeIngredients: (preferencesData.dislikes || [])
          .map(d => pluralize.singular(d).toLowerCase())
          .join(",") || "None",
        diet: preferencesData.dietPreferences
          ? preferencesData.dietPreferences.join(",")
          : preferencesData.diet || "None",
        intolerances: (preferencesData.allergies || [])
          .map(a => a.name.toLowerCase())
          .join(",") || "None",
      };

      console.log('Fetching recipes with preferences:', userPreferencesData);

      const res = await recipeServices.getFinalRecipe(userPreferencesData);
      console.log('finalRecipe response:', res.data);
      const recipeResults = res.data?.results || [];
      setRecipes(recipeResults);
      setPopupmodal(false);
      if (recipeResults.length > 0) {
        const ids = recipeResults.map(r => r.id).join(",");
        const res1 = await recipeServices.getDetailsById(ids);
        setRecipeDetails(res1.data || []);
      }
    } catch (err) {
      console.error('finalRecipe error:', err);
    } finally {
      setLoading(false);
    }
  };



  const editPreferences = () => {
    setPopupmodal(true);
    setPreferencesData(null);
  };

  return (
    <>
      <div className={`${popupmodal ? 'blur-sm select-none pointer-events-none' : ''}`}>
        {/* --- Ingredient Input --- */}
        <div className="flex flex-col mt-10 gap-6 w-[90%]  mx-auto">
          {/* Input */}
          <div className="relative w-full">
            <span className="text-3xl absolute transform -translate-y-1/2 top-1/2 left-3">🍳</span>
            <input
              type="text"
              placeholder="Put your ingredients"
              className="pl-12 pr-24 border border-gray-300 rounded-md py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-600 shadow-md text-lg"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white font-bold px-4 py-1 rounded hover:bg-blue-700 cursor-pointer"
              onClick={handleSubmit}
            >
              {loading ? '...' : 'Extract'}
            </button>
          </div>

          {/* Extracted Ingredients & Preferences Card */}
          {ingredients && (
            <div className="bg-gray-200 p-4 rounded-md shadow-sm w-full">
              <h2 className="font-semibold mb-2">EXTRACTED INGREDIENTS:</h2>
              <ul className="space-y-2 mb-4">
                {Object.entries(ingredients).map(([key]) => (
                  <li key={key} className="flex justify-between items-center border-b border-gray-300 pb-1 capitalize ">
                    {key}
                    <button
                      className="ml-4 text-red-600 font-semibold hover:underline cursor-pointer"
                      onClick={() => deleteIngredient(key)}
                    >
                      <ImCross />
                    </button>
                  </li>
                ))}
              </ul>

              {preferencesData && (
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <h2 className="font-semibold">PREFERENCES:</h2>
                    <span
                      className="text-blue-600 font-semibold text-sm cursor-pointer hover:text-blue-700 hover:underline"
                      onClick={editPreferences}
                    >
                      Edit
                    </span>
                  </div>
                  <p>Allergies: <span className='capitalize'>{preferencesData.allergies.map(a => a.name).join(", ") || "None"}</span></p>
                  <p>Diet: <span className='capitalize'>{preferencesData.dietPreferences.join(", ") || "None"}</span></p>
                  <p>Disliked Ingredients: <span className='capitalize'>{preferencesData.dislikes.join(", ") || "None"}</span></p>
                </div>
              )}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-4 w-full">
            <button
              disabled={preferencesData}
              className={`flex-1 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 font-bold ${preferencesData ? 'cursor-not-allowed' : 'cursor-pointer'}`}
              onClick={fetchRecipes}
            >
              {loading ? '...' : 'Get Recipes'}
            </button>
            <button
              disabled={!preferencesData}
              className={`flex-1 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 font-bold ${preferencesData ? 'cursor-pointer' : 'cursor-not-allowed'}`}
              onClick={finalRecipe}
            >
              {loading ? '...' : 'Get Recipes with Preferences'}
            </button>
          </div>
        </div>

        {/* --- Render Recipe Cards --- */}
        {recipes.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 w-[97%] gap-10 p-4 mx-auto mt-8">
            {recipes.map(recipe => {
              const detail = recipeDetails.find(d => d.id === recipe.id) || {};
              return (
                <div key={recipe.id} className="flex flex-col gap-6 p-4 rounded shadow-lg items-center bg-gray-200">
                  <h2 className="text-center font-bold text-xl  line-clamp-1">{recipe.title}</h2>
                  <img
                    src={recipe.image || detail.image}
                    alt={recipe.title || detail.title}
                    className="w-[90%]  max-h-40 object-cover rounded mx-auto"
                  />
                  {!detail.id ? (
                    <div className="flex flex-col text-lg gap-1 justify-center items-center">
                      <div className="flex gap-4">
                        <span className='font-semibold'>Used Ingredients:</span>
                        <span>{recipe.usedIngredientCount || 0}</span>
                      </div>
                      <div className="flex gap-2">
                        <span className='font-semibold'>Missing Ingredients:</span>
                        <span>{recipe.missedIngredientCount || 0}</span>
                      </div>
                    </div>
                  ) : (
                    <div className="w-[90%] flex flex-col text-lg gap-1 justify-center items-center text-center">
                      <div className='whitespace-normal break-words'>
                        <span className='font-semibold'>
                          Diets: <span className='capitalize font-normal'>
                            {Array.isArray(detail.diets) && detail.diets.length > 0
                              ? detail.diets.join(", ")
                              : "None"}
                          </span>
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <span className='font-semibold'>Ready in minutes:</span>
                        <span>{detail.readyInMinutes || "N/A"}</span>
                      </div>
                    </div>
                  )}
                  <button
                    className="justify-center w-[90%] text-lg font-semibold bg-blue-600 hover:bg-blue-700 cursor-pointer py-1 px-4 rounded-md shadow-md text-white flex gap-2"
                    onClick={() => navigate(`/recipe/${recipe.id}`, { state: { recipeDetails: detail } })}
                  >
                    Go <FaArrowRight className="transform translate-y-1" />
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* --- Modal for Preferences --- */}
      {popupmodal && (
        <div className="fixed inset-0 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-11/12 shadow-2xl">
            <h2 className="text-2xl font-semibold text-center text-blue-600 mb-6">
              Do you have any <span className="text-red-600">allergies</span> or <span className="text-red-600">diet preferences</span>?
            </h2>
            <div className="relative flex flex-col gap-4">
              <div>
                <span className='text-lg font-semibold'>Allergies/Intolerances: </span>
                <Dropdown
                  options={KNOWN_ALLERGIES}
                  selected={preferences.allergies || []}
                  setSelected={(selected) => setPreferences(prev => ({ ...prev, allergies: selected }))}
                  placeholder="Select allergies"
                  singleSelect={false}
                />
              </div>
              <div>
                <span className='text-lg font-semibold'>Diet: </span>
                <Dropdown
                  options={KNOWN_DIETS}
                  selected={preferences.diet ? [preferences.diet] : []}
                  setSelected={(selected) => setPreferences(prev => ({ ...prev, diet: selected[0] || "" }))}
                  placeholder="Select diet"
                  singleSelect={true}
                />
              </div>
              <div>
                <span className='text-lg font-semibold '>Disliked Ingredients: </span>
                <input
                  type="text"
                  placeholder="Any disliked Ingredient?"
                  value={preferences.dislikes}
                  onChange={(e) => setPreferences(prev => ({ ...prev, dislikes: e.target.value }))}
                  className=" w-full text-left px-4 py-2 rounded-md bg-gray-200 border focus:outline-none focus:ring-2focus:ring-blue-600 placeholder:text-black placeholder:opacity-100"
                />
              </div>
            </div>
            <div className='flex justify-center mt-4'>
              <button
                onClick={fetchPreferences}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded-md shadow-md cursor-pointer"
              >
                {loading ? "..." : "Extract"}
              </button>
            </div>
          </div>
        </div>
      )}


    </>
  );

};

export default UserInput;