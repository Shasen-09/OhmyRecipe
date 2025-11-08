import React, { useState, useEffect } from 'react';
import { IoIosLock } from "react-icons/io";
import { IoMail } from "react-icons/io5";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, logout } from '../redux/store/authSlice';
import image from '../assets/images/2.png';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, user, token } = useSelector((state) => state.auth);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {

    if (user && token) {
      navigate('/home');
    }
  }, [user, navigate]);

  const loginHandler = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }

    try {
      const resultAction = await dispatch(loginUser({ email, password }));

      if (loginUser.fulfilled.match(resultAction)) {
        const { user, token } = resultAction.payload;

        if (!user.isVerified) {
          alert("User is not verified");

          dispatch(logout());
          return;
        }

        if (token && user) {
          navigate('/home');
        }
      } else {
        alert(resultAction.payload || 'Login failed');
      }
    } catch (err) {
      console.error("Login error:", err);
      alert('Unexpected error occurred');
      dispatch(logout());
    }
  };

  return (
    <div className="flex min-h-screen">
      <div className="w-1/2 bg-white flex items-center justify-center">
        <img src={image} alt="Login Illustration" className="max-w-md" />
      </div>


      <div className="w-1/2 bg-blue-600 flex items-center justify-center">
        <div className="bg-white p-10 rounded-lg shadow-lg w-80 space-y-5">
          <h2 className="text-2xl font-bold text-blue-600">Hello!</h2>
          <p className="text-sm text-gray-400">Sign in to continue</p>


          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
              <IoMail />
            </span>
            <input
              type="email"
              placeholder="Email Address"
              className="w-full pl-10 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
            />
          </div>


          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
              <IoIosLock />
            </span>
            <input
              type="password"
              placeholder="Password"
              className="w-full pl-10 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
            />
          </div>


          <button
            className="w-full rounded-md bg-blue-600 text-white font-bold py-2 hover:bg-blue-700 transition duration-200 disabled:opacity-50"
            onClick={loginHandler}
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>

          {error && <p className="text-red-600 text-sm">{error}</p>}

          <div className="text-sm text-center">
            <Link to="/forgot" className="text-blue-600 hover:underline">
              Forgot Password
            </Link>
          </div>

          <div className="text-sm text-center">
            Don't have an account?{' '}
            <Link to="/register" className="text-blue-600 hover:underline">
              Register now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
