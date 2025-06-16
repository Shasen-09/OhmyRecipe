import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBAr from './NavBAr';
import recipeServices from '../services/recipeServices';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faBook, faBowlFood, faBurger, faCircleCheck, faPizzaSlice, faUtensils, faXmark } from '@fortawesome/free-solid-svg-icons';

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

  const handleClick = () => {
    navigate('/login')
  }

  if (loading) return <p>Loading popular recipes...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <NavBAr />
      <div className='w-[600px] h-[600px] bg-gradient-to-tr from-blue-600/20 to-pink-500/20 rounded-full -left-28 -top-0.05 absolute blur-[50px] pointer-events-none'></div>

      <div className="items-center justify-center mt-10">
        <h1 className="text-6xl font-bold mb-10 text-red-500 hover:opacity-50 text-center">Bhok lagyo - <span className=' text-blue-600 '>K khane ta?
        </span>
        </h1>

        <div>


          <div className=" flex gap-5 w-[95%] mx-auto">
            <span className="text-4xl font-bold whitespace-nowrap text-red-600"><span className='text-blue-600'>Recipe for</span> this week</span>
            <div className="flex-1 overflow-hidden  rounded px-2 h-12 relative w-[70%] mx-auto">
              <div className="absolute animate-marquee whitespace-nowrap text-white text-2xl flex gap-8 items-center h-full">
                {[...Array(20)].map((_, i) => (
                  <React.Fragment key={i}>
                    <FontAwesomeIcon icon={faPizzaSlice} className='text-blue-600' />
                    <FontAwesomeIcon icon={faBurger} className='text-blue-600' />
                    <FontAwesomeIcon icon={faBowlFood} className='text-blue-600' />
                    <FontAwesomeIcon icon={faUtensils} className='text-blue-600' />
                    <FontAwesomeIcon icon={faBook} className='text-blue-600' />
                  </React.Fragment>
                ))}
              </div>
            </div>

          </div>



          <div className=' grid grid-cols-1 md:grid-cols-3 w-[97%]  gap-10 p-4 mx-auto'>
            {recipes.map(recipe => (
              <div key={recipe.id} className="flex gap-6 border border-none p-4 rounded shadow-lg items-center bg-gray-200">
                <img
                  src={recipe.image}
                  alt={recipe.title}
                  className="w-40 h-30 object-cover rounded"
                />
                <div className='w-full'>
                  <h3 className="text-xl font-semibold mb-1 line-clamp-3">{recipe.title}</h3>
                  <div className="flex justify-between items-center">
                    <strong>Vegetarian: </strong>
                    {recipe.vegetarian ? (
                      <FontAwesomeIcon icon={faCircleCheck} className="text-xl text-green-500" />
                    ) : (
                      <FontAwesomeIcon icon={faXmark} className="text-xl text-red-500" />
                    )}
                  </div>

                  <div className='flex justify-between items-center'><strong>Vegan: </strong> {recipe.vegan ? <FontAwesomeIcon icon={faCircleCheck} className='text-xl text-green-500' /> : <FontAwesomeIcon icon={faXmark} className='text-xl text-red-500' />}</div>
                  <div className='flex justify-between items-center'><strong>Gluten-Free: </strong>{recipe.glutenFree ? <FontAwesomeIcon icon={faCircleCheck} className='text-xl text-green-500' /> : <FontAwesomeIcon icon={faXmark} className='text-xl text-red-500' />}</div>

                  <div className='flex justify-between items-center'><strong>Health Score:</strong> {recipe.healthScore}</div>


                  <div className='flex justify-between items-center'><strong>Likes:</strong>
                    {recipe.aggregateLikes}</div>
                  <button className='bg-blue-600 rounded-full text-white w-full h-8 mx-auto cursor-pointer' onClick={handleClick}><FontAwesomeIcon icon={faArrowRight} /></button>

                </div>


              </div>
            ))}

          </div>



        </div >
      </div >


      <div className='flex gap-5 mb-10 justify-center'>
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

    </>
  );
};

export default Landing;
