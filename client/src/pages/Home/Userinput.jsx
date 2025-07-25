import React, { useState } from 'react';
import recipeServices from '../../services/recipeServices';
import { ImCross } from "react-icons/im";
import { FaArrowRight } from "react-icons/fa";

const UserInput = () => {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [ingredients, setIngredients] = useState({});

  const [newIngredients, setNewIngredients] = useState('');
  const [newIngredientsValue, setNewIngredientsValue] = useState('');

  const [recipes, setRecipe] = useState([]);

  const addIngredient = () => {
    if (!newIngredients.trim() || !newIngredientsValue.trim()) {
      alert('Please fill in the both fields');
      return;
    }
    if (!ingredients || Object.keys(ingredients).length === 0) {
      alert('Please Extract ingredients first');
      setNewIngredients('');
      setNewIngredientsValue('');
      return;
    }
    setIngredients(prev => ({
      ...prev,
      [newIngredients.trim()]: newIngredientsValue.trim()
    })
    )
    setNewIngredients('');
    setNewIngredientsValue('');
  }

  const deleteIngredient = (key) => {
    const updatedIngredient = { ...ingredients };
    delete updatedIngredient[key];

    setIngredients(updatedIngredient);

  }

  const fetchRecipes = async () => {
    if (!ingredients || Object.keys(ingredients).length === 0) {
      alert('Please extract ingredients first')
      return;
    }
    setLoading(true);
    try {
      const res = await recipeServices.recipesByIngredients(ingredients);
      setRecipe(res.data);
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



  return (
    <>

      <div className=''>
        <div className='relative'>
          <div className={`flex flex-col  mt-10 gap-4 ${recipes.length > 0 ? 'items-start ml-10' : 'items-center '}`}>
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
                className='absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white font-bold px-3 py-1 rounded hover:bg-blue-700 '
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
                  </div>
                )
              }
              <div className='mt-4 flex gap-2 items-center '>
                <input type='text' placeholder='Add ingredient' value={newIngredients} onChange={(e) => setNewIngredients(e.target.value)} className='border border-gray-300 rounded-md px-2 py-1 flex-1 focus:outline-none focus:ring-2 focus:ring-blue-600 shadow-md' />
                <input type='text' placeholder='Value' value={newIngredientsValue} onChange={(e) => setNewIngredientsValue(e.target.value)} className='border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 shadow-md px-2 py-1 flex-1' />
                <button className='bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700 cursor-pointer font-bold' onClick={addIngredient}>Add</button>
              </div>
            </div>
            <div className='w-1/2 flex justify-center'><button className='bg-blue-600 text-white  px-3 py-1 rounded-md hover:bg-blue-700 cursor-pointer font-bold' onClick={fetchRecipes}>Submit</button></div>
          </div>

          <div className='absolute right-8  w-[45%] top-5'>
            {
              recipes.length > 0 && (
                <div className='text-center'>
                  <h2>Do you have any allergies or diet preferences?</h2>
                  <input type='text' placeholder='ask something' className='border border-none focus:ring-2 focus:ring-blue-600 focus:outline-none text-lg shadow-md font-semibold py-1 px-2 ' />
                </div>
              )
            }
          </div>
        </div>


        {
          recipes.length > 0 && (

            <div className=' grid grid-cols-1 md:grid-cols-3 w-[97%]  gap-10 p-4 mx-auto'>
              {
                recipes.map((recipe) =>
                  <div key={recipe.id} className='flex flex-col gap-6  border border-none p-4 rounded shadow-lg items-center bg-gray-200'>
                    <h2 className='text-center  font-semibold text-xl mb-1 line-clamp-1'>{recipe.title}</h2>
                    <img
                      src={recipe.image}
                      alt={recipe.title}
                      className='w-[90%] mb-1 max-h-40 object-cover rounded mx-auto'
                    />
                    <div className="flex flex-col text-lg gap-1 justify-center items-center">
                      <div className="flex gap-4 ">
                        <span>Used Ingredients:</span>
                        <span>{recipe.usedIngredientCount}</span>
                      </div>
                      <div className="flex gap-2">
                        <span>Missing Ingredients:</span>
                        <span>{recipe.missedIngredientCount}</span>
                      </div>

                    </div>
                    <button className='justify-center w-[90%] text-lg font-semibold bg-blue-600 hover:bg-blue-700 cursor-pointer py-1 px-4 rounded-md shadow-md text-white flex gap-2  '>Go <FaArrowRight className='transform translate-y-1' /></button>
                  </div>
                )
              }

            </div>

          )
        }
      </div >


    </>
  );
};

export default UserInput;
