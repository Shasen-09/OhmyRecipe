import React, { useState } from 'react';
import recipeServices from '../../services/recipeServices';

const UserInput = () => {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [ingredients, setIngredients] = useState({});

  const [newIngredients, setNewIngredients] = useState('');
  const [newIngredientsValue, setNewIngredientsValue] = useState('');

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
    <div className='flex flex-col items-center mt-10 gap-4'>
      <div className='relative w-1/2'>
        <span className='text-3xl absolute transform -translate-y-1/2 top-1/2 left-2'>🍳</span>
        <input
          type='text'
          placeholder='Put your ingredients'
          className='pl-12 pr-10 border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-600 shadow-md text-lg'
          value={input}
          onChange={handleChange}
        />
      </div>
      <button className='bg-blue-600 rounded-md text-white font-bold p-2 cursor-pointer hover:bg-blue-700'
        onClick={handleSubmit}>{loading ? 'Extracting' : 'Extract'}</button>

      <div className='bg-gray-100 w-1/2 pl-10 pr-10 py-2 rounded-md shadow-sm uppercase'>
        {
          ingredients && (
            <div>
              <h2 className='font-semibold mb-2'>Extracted ingredients:</h2>
              <ul className='space-y-2'>
                {Object.entries(ingredients).map(([key, value]) => (
                  <li className='flex justify-between items-center border-b border-gray-200 pb-1' key={key}>{key}: {value}
                    <button className='ml-4 text-red-600 font-semibold hover:underline'>delete</button>
                  </li>

                ))}
              </ul>
            </div>
          )
        }
        <div className='mt-4 flex gap-2 items-center '>
          <input type='text' placeholder='Add ingredient' value={newIngredients} onChange={(e) => setNewIngredients(e.target.value)} className='border border-gray-300 rounded-md px-2 py-1 flex-1 focus:outline-none focus:ring-2 focus:ring-blue-600 shadow-md' />
          <input type='text' placeholder='Value' value={newIngredientsValue} onChange={(e) => setNewIngredientsValue(e.target.value)} className='border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 shadow-md px-2 py-1 flex-1' />
          <button className="bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700 cursor-pointer font-bold" onClick={addIngredient}>Add</button>
        </div>
      </div>

    </div>
  );
};

export default UserInput;
