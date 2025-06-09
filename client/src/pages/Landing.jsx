import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import NavBAr from './NavBAr';

const Landing = () => {
  const navigate = useNavigate();



  return (
    <>
      <NavBAr />
      <div className=' w-[600px] h-[600px] bg-gradient-to-tr from-blue-600/20 to-pink-500/20 rounded-full  -left-28 -top-0.05 absolute blur-[50px] pointer-events-none'></div>
      <div className=" items-center justify-center ">
        <h1 className="text-6xl font-bold mb-10">Welcome to the Landing Page</h1>
        <div className='flex gap-5'>
          <button onClick={() => navigate('/login')} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded shadow hover:opacity-50 ">
            Login
          </button>
          <button onClick={() => navigate('/register')}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded shadow hover:opacity-50 " >Register</button>

        </div>



      </div>

    </>
  )
}

export default Landing
