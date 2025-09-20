import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthServices from '../services/AuthServices';
import NavBAr from './NavBAr';
import Userinput from './Home/Userinput';

const Home = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    const checkAccess = async () => {
      if (!token || !user) {
        alert("You must be logged in");
        navigate('/login');
        return;
      }

      const isVerified = user.isVerified === true || user.isVerified === 'true';
      if (!isVerified) {
        alert("Please verify your account first!");
        navigate('/verify');
      }

      try {
        const response = await AuthServices.homeService(token);
        alert(response.data.message);
      } catch (error) {
        alert("Failed to access home data. Please login again.");
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
        console.log(error);
      }
    };

    checkAccess();
  }, [navigate, token, user]);




  return (
    <>
      <NavBAr />
      <div className=' w-[600px] h-[600px] bg-gradient-to-tr from-blue-600/20 to-pink-500/20 rounded-full  -left-28 -top-0.05 absolute blur-[50px] pointer-events-none'></div>
      <div className=" text-center">
        <h1 className="text-6xl font-bold mb-10 text-blue-600">Welcome <span className='uppercase text-red-600'>{user.username}</span> </h1>

      </div>
      <Userinput />
    </>
  )
}

export default Home