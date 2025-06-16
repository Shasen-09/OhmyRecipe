import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBAr from './NavBAr';
import recipeServices from '../services/recipeServices';

const Landing = () => {
  const navigate = useNavigate();

  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPopular = async () => {
      try {
        const res = await recipeServices.popularWeekServices();
        console.log('API response:', res.data);
        setRecipes(res.data.recipes || []);

      } catch (err) {
        setError('Failed to load recipes');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPopular();
  }, []);

  if (loading) return <p>Loading popular recipes...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <NavBAr />
      <div className='w-[600px] h-[600px] bg-gradient-to-tr from-blue-600/20 to-pink-500/20 rounded-full -left-28 -top-0.05 absolute blur-[50px] pointer-events-none'></div>
      <div className="items-center justify-center">
        <h1 className="text-6xl font-bold mb-10">Welcome to the Landing Page</h1>
        <div className='flex gap-5 mb-10'>
          <button
            onClick={() => navigate('/login')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded shadow hover:opacity-50"
          >
            Login
          </button>
          <button
            onClick={() => navigate('/register')}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded shadow hover:opacity-50"
          >
            Register
          </button>
        </div>
        <div>
          <h2 className="text-3xl mb-6">Popular Recipes This Week</h2>
          <ul className="space-y-6">
            {recipes.map(recipe => (
              <li key={recipe.id} className="flex gap-6 border p-4 rounded shadow-sm items-center">
                <img
                  src={recipe.image}
                  alt={recipe.title}
                  className="w-40 h-24 object-cover rounded"
                />
                <div>
                  <h3 className="text-xl font-semibold mb-1">{recipe.title}</h3>
                  <p><strong>ID:</strong> {recipe.id}</p>
                  <p><strong>Ready in:</strong> {recipe.readyInMinutes} minutes</p>
                  <p><strong>Health Score:</strong> {recipe.healthScore}</p>
                  <p><strong>Likes:</strong> {recipe.aggregateLikes}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Landing;
