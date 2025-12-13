import React, { useState } from 'react';
import Sidebar from '../Sidebar';
import { useSidebar } from '../../context/SidebarContext';
import recipeServices from '../../services/recipeServices';
import { FaArrowRight } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const SearchRecipes = () => {
  const { isOpen } = useSidebar();
  const [name, setName] = useState('');
  const [result, setResult] = useState([]);
  const navigate = useNavigate();

  const getRecipes = async () => {
    if (!name) return;
    try {
      const response = await recipeServices.getRecipesbyName(name);
      setResult(response.data.results || []);
      console.log(response.data.results);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Sidebar />
      <div
        className={`transition-all duration-300 min-h-screen p-6 bg-gray-100 ${isOpen ? 'ml-64' : 'ml-16'
          }`}
      >
        <h1 className="text-2xl font-bold mb-6">Search Recipes</h1>

        <div className="flex flex-col sm:flex-row items-center mb-6 gap-4">
          <input
            type="text"
            placeholder="Enter recipe name..."
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="flex-1 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={getRecipes}
            className="w-full sm:w-auto px-6 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition-colors"
          >
            Search
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {result.length > 0 ? (
            result.map((r) => (
              <div
                key={r.id}
                className="bg-gray-200 p-4 rounded-lg shadow hover:shadow-lg transition-shadow flex flex-col"
              >
                <h2 className="text-center font-bold text-lg mb-4 line-clamp-1">
                  {r.title}
                </h2>
                {r.image && (
                  <img
                    src={r.image}
                    alt={r.title}
                    className="w-full h-40 object-cover rounded-md mb-4"
                  />
                )}
                <button
                  className="justify-center  text-lg font-semibold bg-blue-600 hover:bg-blue-700 cursor-pointer py-1 px-4 rounded-md shadow-md text-white flex gap-2"
                  onClick={() => navigate(`/recipe/${r.id}`, { replace: true })}
                >
                  Go <FaArrowRight className="transform translate-y-1" />
                </button>
              </div>
            ))
          ) : (
            <p className="text-gray-500 col-span-full text-center">
              No recipes found. Try searching for something!
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default SearchRecipes;
