import React, { useState } from 'react';
import recipeServices from '../../services/recipeServices';

const UserInput = () => {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [ingredients, setIngredients] = useState('');


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
          className='pl-12 pr-10 border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-600 shadow-sm text-lg'
          value={input}
          onChange={handleChange}
        />
      </div>
      <button className='bg-blue-600 rounded-md text-white font-bold p-2 cursor-pointer hover:bg-blue-700'
        onClick={handleSubmit}>{loading ? 'Searching' : 'Find Recipes'}</button>

      <div className='bg-gray-100 w-1/2 pl-10 pr-10 py-2 rounded-md shadow-sm uppercase'>
        {
          ingredients && (
            <div>
              <h2 className='font-semibold mb-2'>Extracted ingredients:</h2>
              <ul className='list-disc list-inside'>
                {Object.entries(ingredients).map(([key, value]) => (
                  <li key={key}>{key}: {value}</li>
                ))}
              </ul>
            </div>
          )
        }
      </div>

    </div>
  );
};

export default UserInput;
