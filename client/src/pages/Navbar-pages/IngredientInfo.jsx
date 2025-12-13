import React, { useState } from 'react';
import { useSidebar } from '../../context/SidebarContext';
import Sidebar from '../Sidebar';
import recipeServices from '../../services/recipeServices';

const IngredientInfo = () => {
  const { isOpen } = useSidebar();
  const [ingredientName, setIngredientName] = useState('');
  const [info, setInfo] = useState(null);
  const [loading, setLoading] = useState(false);

  const getIngredientInfo = async (name) => {
    if (!name) return;
    try {
      setLoading(true);
      const response = await recipeServices.getIngredientInfo(name);
      setInfo(response.data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
      setInfo(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Sidebar />
      <div className={`transition-all duration-300 ${isOpen ? 'ml-64' : 'ml-16'} p-6 min-h-screen bg-gray-100`}>
        <h1 className="text-3xl font-bold mb-6 text-center">Ingredient Info</h1>

        {/* Container to align input and card */}
        <div className="flex flex-col items-center gap-6">
          {/* Input */}
          <div className="flex w-full max-w-md gap-2">
            <input
              type="text"
              value={ingredientName}
              onChange={(e) => setIngredientName(e.target.value)}
              placeholder="Enter ingredient name..."
              className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              onClick={() => getIngredientInfo(ingredientName)}
              className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition"
            >
              Fetch
            </button>
          </div>

          {/* Loading */}
          {loading && <p className="text-gray-500">Loading...</p>}

          {/* Ingredient Info */}
          {info && (
            <div className="w-full max-w-md bg-white shadow-lg rounded-2xl overflow-hidden p-6">
              <div className="flex justify-center mb-4">
                {info.image ? (
                  <img
                    src={`https://spoonacular.com/cdn/ingredients_100x100/${info.image}`}
                    alt={info.name}
                    className="w-24 h-24 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center text-gray-400">
                    No Image
                  </div>
                )}
              </div>

              <h2 className="text-2xl font-semibold text-center mb-2 capitalize">{info.name}</h2>
              {info.original && <p className="text-gray-600 text-center mb-1">Original: <span className='capitalize'>{info.original}</span></p>}

              <div className="text-gray-700 mt-4 space-y-2">
                {info.aisle && <p><span className="font-medium ">Aisle:</span> <span className='capitalize'>{info.aisle}</span> </p>}
                {info.consistency && <p><span className="font-medium ">Consistency:</span> <span className='capitalize'>{info.consistency}</span></p>}
                {info.possibleUnits?.length > 0 && (
                  <p><span className="font-medium">Units:</span> <span className='capitalize'>{info.possibleUnits.join(", ")}</span></p>
                )}
                {info.categoryPath?.length > 0 && (
                  <div className="mt-2 flex gap-2">
                    <span className="font-medium">Category:</span>
                    <div className="flex flex-wrap gap-2 ">
                      {info.categoryPath.map((cat, index) => (
                        <span
                          key={index}
                          className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium capitalize"
                        >
                          {cat}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

              </div>
            </div>
          )}

          {!info && !loading && (
            <p className="text-gray-500 mt-4">Enter an ingredient and click Fetch to see details</p>
          )}
        </div>
      </div>
    </>
  );
};

export default IngredientInfo;
