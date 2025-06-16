import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthServices from '../services/AuthServices';
import NavBAr from './NavBAr';

const Home = () => {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem('user'));

  const logOut = () => {
    localStorage.removeItem("user");
    navigate('/login');
  }

  useEffect(() => {
    const checkAccess = async () => {
      if (!token || !user) {
        alert("You must be logged in");
        navigate('/login');
        return;
      }

      const isverified = user.isverified === true || user.isverified === 'true';
      if (!isverified) {
        alert("Please verify your account first!");
        navigate('/verify'); // redirect to your verification page, not '/'
        return;
      }

      try {
        const response = await AuthServices.homeService(token);
        alert(response.data.message);
      } catch (error) {
        alert("Failed to access home data. Please login again.");
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
      <div className=" items-center justify-center ">
        <h1 className="text-6xl font-bold mb-10">Welcome to the Home Page</h1>

      </div>
    </>
  )
}

export default Home