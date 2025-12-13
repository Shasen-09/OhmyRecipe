import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthServices from '../services/AuthServices';
import Sidebar from './Sidebar';
import Userinput from './Home/Userinput';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/store/authSlice';
import { useSidebar } from '../context/SidebarContext';
import axios from 'axios';

const Home = () => {
  const [name, setName] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = localStorage.getItem('user');
  const user = userData ? JSON.parse(userData) : null;
  const { isOpen } = useSidebar();

  useEffect(() => {
    const checkAccess = async () => {
      const token = localStorage.getItem('token');
      const userData = localStorage.getItem('user');
      const user = userData ? JSON.parse(userData) : null;
      if (!token || !user) {
        alert("You must be logged in");
        dispatch(logout());
        navigate('/login');
        return;
      }

      const isVerified = user.isVerified === true || user.isVerified === 'true';
      if (!isVerified) {
        alert("Please verify your account first!");
        navigate('/verify');
        return;
      }

      try {
        const response = await AuthServices.homeService(token);
        if (response?.data?.message) {
          alert(response.data.message);
        }
        const res = await axios.get("/user/getProfile", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setName(res.data.username);
        console.log(res.data)
      } catch (error) {
        alert("Failed to access home data. Please login again.");
        dispatch(logout());
        navigate('/login');
        console.error("Home access error:", error);
      }
    };

    checkAccess();
  }, [navigate, dispatch]);


  if (!user) return null;

  return (
    <>
      <Sidebar />
      <div
        className={`transition-all duration-300 relative ${isOpen ? 'ml-64' : 'ml-16'
          }`}
      >
        <div className='w-[600px] h-[600px] bg-gradient-to-tr from-blue-600/20 to-pink-500/20 rounded-full -left-28 top-0 absolute blur-[50px] pointer-events-none'></div>
        <div className="text-center">
          <h1 className="text-6xl font-bold mb-10 text-blue-600">
            Welcome <span className='uppercase text-red-600'>{name}</span>
          </h1>
        </div>
        <Userinput />
      </div>
    </>
  );
};

export default Home;
