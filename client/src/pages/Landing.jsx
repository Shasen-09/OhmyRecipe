import React from 'react';
import { useNavigate } from 'react-router-dom';


import Recipe from './landing-pages/Recipe';
import Bar from './landing-pages/Bar';
import AboutUs from './landing-pages/AboutUs';
import Features from './landing-pages/Features';
import Testimonials from './landing-pages/Testimonials';
import Footer from './landing-pages/Footer';
import NavUI from './user-pages/NavUI';

const Landing = () => {

  const navigate = useNavigate();


  return (
    <>

      <NavUI />
      <Bar />
      <div className='w-[600px] h-[600px] bg-gradient-to-tr from-blue-600/20 to-pink-500/20 rounded-full -left-28 -top-0.05 absolute blur-[50px] pointer-events-none'></div>

      <div className="items-center justify-center mt-10">
        <h1 className="text-6xl font-bold mb-10 text-red-500 hover:opacity-50 text-center">Bhok lagyo - <span className=' text-blue-600 '>K khane ta?
        </span>
        </h1>

      </div >
      <Recipe />

      <AboutUs />
      <Features />
      <Testimonials />
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
      <Footer />




    </>
  );
};

export default Landing;
