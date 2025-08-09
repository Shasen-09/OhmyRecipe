import React, { useState } from 'react';
import recipeServices from '../../services/recipeServices';
import { ImCross } from "react-icons/im";
import { FaArrowRight } from "react-icons/fa";
import pluralize from 'pluralize';


const UserInput = () => {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [ingredients, setIngredients] = useState({});

  const [recipeDetails, setRecipeDetails] = useState([]);

  const [recipes, setRecipe] = useState([]);
  const [popupmodal, setPopupmodal] = useState(false);

  const [preferences, setPreferences] = useState({
    allergies: '',
    diet: '',
    dislikes: ''
  });
  const [preferencesData, setPreferencesData] = useState(null);



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

      const combinedPreferences = `${preferences.allergies},${preferences.diet},${preferences.dislikes}`;

      const res = await recipeServices.userPreferences(combinedPreferences);
      const { allergies = [], dislikes = [] } = res.data;

      const restrictedKeywords = [
        ...allergies.map(a => pluralize.singular(a.name).toUpperCase()),
        ...dislikes.map(d => pluralize.singular(d).toUpperCase())
      ];


      const filteredIngredients = Object.entries(ingredients).reduce((acc, [key, value]) => {
        const singularKey = pluralize.singular(key).toUpperCase();
        const hasConflict = restrictedKeywords.some(r => singularKey.includes(r));
        if (!hasConflict) {
          acc[singularKey] = value;
        }
        return acc;
      }, {});


      const removed = Object.keys(ingredients).filter(key =>
        restrictedKeywords.some(r =>
          pluralize.singular(key).toUpperCase().includes(r)
        )
      );

      if (removed.length > 0) {
        alert(`Removed due to preferences: ${removed.join(", ")}`);
      }
      setPreferencesData(res.data);
      setIngredients(filteredIngredients);
      setPopupmodal(false);

    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };


  const fetchRecipes = async () => {
    if (!ingredients || Object.keys(ingredients).length === 0) {
      alert('Please extract ingredients first')
      return;
    }
    setLoading(true);
    try {
      const res = await recipeServices.recipesByIngredients(ingredients);
      setRecipe(res.data);
      setPopupmodal(true);
      console.log(res.data);

    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }


  const handleChange = (e) => setInput(e.target.value);

  const handleSubmit = async () => {
    if (!input.trim()) return (alert('Please put your ingredients list'))
    setLoading(true);

    try {
      const res = await recipeServices.userInputServices(input);
      setIngredients(res.data.ingredients);
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false);
    }

  }

  const finalRecipe = async () => {
    try {
      if (!preferencesData) {
        return;
      }
      setLoading(true);
      const userPreferencesData = {
        includeIngredients: Object.keys(ingredients)
          .map(i => pluralize.singular(i).toLowerCase())
          .join(",") || "None",

        excludeIngredients: (preferencesData?.dislikes || [])
          .map(d => pluralize.singular(d).toLowerCase())
          .join(",") || "None",

        diet: (preferencesData?.dietPreferences || [])
          .map(d => d.toLowerCase())
          .join(",") || "None",

        intolerances: (preferencesData?.allergies || [])
          .map(a => a.name.toLowerCase())
          .join(",") || "None",
      };
      const res = await recipeServices.getFinalRecipe(userPreferencesData);
      console.log(userPreferencesData);

      console.log('Response:', res.data);
      if (!res) {
        console.log("There is no recipe as per your request")
      }
      setRecipe(res.data.results);
      const ids = res.data.results.map(recipe => recipe.id).join(",");

      const res1 = await recipeServices.getDetailsById(ids);
      console.log('Response 2: ', res1.data);
      setRecipeDetails(res1.data);

    } catch (error) {
      console.log("Error in fetching recipes with preferences", error)
    } finally {
      setLoading(false);

    }
  }
  const editPreferences = () => {
    setPopupmodal(true);
    setPreferencesData('');
  }




  return (
    <>



      <div className=''>

        <div className={`${popupmodal ? 'blur-sm select-none pointer-events-none' : ''}`}>
          <div className='relative'>
            <div className='flex flex-col  mt-10 gap-4 items-center'>

              <div className='relative w-1/2'>
                <span className='text-3xl absolute transform -translate-y-1/2 top-1/2 left-2'>🍳</span>

                <input
                  type='text'
                  placeholder='Put your ingredients'
                  className='pl-12 pr-24 border border-gray-300 rounded-md py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-600 shadow-md text-lg'
                  value={input}
                  onChange={handleChange}
                />

                <button
                  className='absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white font-bold px-3 py-1 rounded hover:bg-blue-700 cursor-pointer'
                  onClick={handleSubmit}
                >
                  {loading ? '...' : 'Extract'}
                </button>
              </div>


              <div className='bg-gray-200 w-1/2 pl-10 pr-10 py-2 rounded-md shadow-sm uppercase'>
                {
                  ingredients && (
                    <div>
                      <h2 className='font-semibold mb-2'>Extracted ingredients:</h2>
                      <ul className='space-y-2'>
                        {Object.entries(ingredients).map(([key, value]) => (
                          <li className='flex justify-between items-center border-b border-gray-200 pb-1' key={key}>{key}: {value}
                            <button className='ml-4 text-red-600 font-semibold hover:underline cursor-pointer' onClick={() => deleteIngredient(key)}><ImCross /></button>
                          </li>

                        ))}
                      </ul>
                      {
                        preferencesData && (
                          <div>
                            <div className='flex justify-between'><h2 className='font-semibold mb-2'>Preferences:</h2><span className='capitalize  text-blue-600  font-semibold text-sm cursor-pointer hover:text-blue-700 hover:underline ' onClick={editPreferences}>Edit</span></div>
                            <p>Allergies: <span>{preferencesData?.allergies?.map(a => a.name).join(", ") || "None"}</span> </p>
                            <p>Diet: <span>{preferencesData?.dietPreferences?.join(",") || "None"}</span> </p>
                            <p>Disliked Ingredient: <span>{preferencesData?.dislikes?.join(",") || "None"}</span> </p>
                          </div>
                        )
                      }
                    </div>
                  )
                }

              </div>
              <div className='w-1/2 flex gap-4 justify-center'><button
                disabled={preferencesData}
                className={`bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700  font-bold ${preferencesData ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                onClick={fetchRecipes}
              >
                {loading ? '...' : 'Get Recipes'}
              </button>
                <button
                  disabled={!preferencesData}
                  className={`bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700  font-bold ${preferencesData ? 'cursor-pointer' : 'cursor-not-allowed'}`}
                  onClick={finalRecipe}
                >
                  {loading ? '...' : 'Get Final Recipes'}
                </button></div>
            </div>
          </div>


          {
            recipes.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-3 w-[97%] gap-10 p-4 mx-auto">
                {recipes.map(recipe => {

                  const detail = recipeDetails.find(d => d.id === recipe.id) || {};

                  return (
                    <div key={recipe.id} className="flex flex-col gap-6 p-4 rounded shadow-lg items-center bg-gray-200">
                      <h2 className="text-center font-bold text-xl mb-1 line-clamp-1">{recipe.title}</h2>
                      <img
                        src={recipe.image || detail.image}
                        alt={recipe.title || detail.title}
                        className="w-[90%] mb-1 max-h-40 object-cover rounded mx-auto"
                      />

                      {!detail.id ? (
                        <div className="flex flex-col text-lg gap-1 justify-center items-center">
                          <div className="flex gap-4">
                            <span className='font-semibold'>Used Ingredients:</span>
                            <span>{recipe.usedIngredientCount}</span>
                          </div>
                          <div className="flex gap-2">
                            <span className='font-semibold'>Missing Ingredients:</span>
                            <span>{recipe.missedIngredientCount}</span>
                          </div>
                        </div>
                      ) : (
                        <div className="w-[90%] flex flex-col text-lg gap-1 justify-center items-center text-center">
                          <div className='whitespace-normal break-words'>
                            <span className='font-semibold'>
                              Diets: <span className='capitalize font-normal'>{Array.isArray(detail.diets) && detail.diets.length > 0
                                ? detail.diets.join(", ")
                                : "None"}</span>
                            </span>
                          </div>
                          <div className="flex gap-2">
                            <span className='font-semibold'>Ready in minutes:</span>
                            <span>{detail.readyInMinutes || "N/A"}</span>
                          </div>
                        </div>
                      )}

                      <button className="justify-center w-[90%] text-lg font-semibold bg-blue-600 hover:bg-blue-700 cursor-pointer py-1 px-4 rounded-md shadow-md text-white flex gap-2">
                        Go <FaArrowRight className="transform translate-y-1" />
                      </button>
                    </div>
                  );
                })}
              </div>
            )
          }

        </div>


        {popupmodal && (
          <div className="fixed inset-0   flex justify-center items-center z-50">
            <div className="bg-white  rounded-lg p-8 max-w-md w-11/12 shadow-2xl">
              <h2 className="text-2xl font-semibold text-center text-blue-600 mb-6">
                Do you have any <span className="text-red-600">allergies</span> or <span className="text-red-600">diet preferences</span>?
              </h2>

              <div className="relative">
                <div><span className='text-lg font-semibold'>Allergies/Intolerances: </span><input
                  type="text"
                  placeholder="Do you have any allergies/intolerances?"
                  value={preferences.allergies}
                  onChange={(e) => setPreferences(prev => ({ ...prev, allergies: e.target.value }))}
                  className="w-full py-2 px-4 rounded-md bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-600 text-lg font-semibold shadow-md"
                /></div>
                <div><span className='text-lg font-semibold'>Diet: </span><input
                  type="text"
                  placeholder="What's your diet preferences?"
                  value={preferences.diet}
                  onChange={(e) => setPreferences(prev => ({ ...prev, diet: e.target.value }))}
                  className="w-full py-2 px-4 rounded-md bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-600 text-lg font-semibold shadow-md"
                /></div>
                <div><span className='text-lg font-semibold'>Disliked Ingredients: </span><input
                  type="text"
                  placeholder="Any disliked Ingredient? "
                  value={preferences.dislikes}
                  onChange={(e) => setPreferences(prev => ({ ...prev, dislikes: e.target.value }))}
                  className="w-full py-2 px-4 rounded-md bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-600 text-lg font-semibold shadow-md"
                /></div>

              </div>


              <div className='flex justify-center mt-4'>
                <button
                  onClick={async () => {
                    await fetchPreferences();

                  }}
                  className=" bg-blue-600 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded-md shadow-md cursor-pointer"
                >
                  {loading ? "..." : "Extract"}
                </button>

              </div>
            </div>
          </div>
        )}


      </div >


    </>
  );
};

export default UserInput;
