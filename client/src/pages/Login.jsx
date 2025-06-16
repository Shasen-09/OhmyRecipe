import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../redux/store/authSlice'; // Adjust path as needed

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, user } = useSelector((state) => state.auth);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // If already logged in, redirect
  React.useEffect(() => {
    if (user) navigate('/home');
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
        // Check if user is verified before navigating
        if (!resultAction.payload.user.isverified) {
          alert("User is not verified");
          return;
        }
        navigate('/home');
      } else {
        // loginUser rejected
        alert(resultAction.payload || 'Login failed');
      }
    } catch (err) {
      alert('Unexpected error occurred');
    }
  };

  return (
    <div className='flex flex-col justify-center items-center min-h-screen bg-gray-100'>
      <div className='grid gap-5 border-2 p-20 rounded-t items-center justify-center'>
        <FontAwesomeIcon icon={faCircleUser} className="text-[200px] text-blue-600 mx-auto mb-4" />

        <input
          type='email'
          placeholder='Enter your email'
          className='border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type='password'
          placeholder='Enter your password'
          className='border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          className='rounded-md bg-blue-600 text-white font-bold py-2 hover:bg-blue-700 transition duration-200 disabled:opacity-50'
          onClick={loginHandler}
          disabled={loading}
        >
          {loading ? 'Logging in...' : 'Log in'}
        </button>

        {error && <p className="text-red-600">{error}</p>}

        <p>
          Don't have an account?{' '}
          <Link to='/register' className='text-blue-600 hover:underline'>
            Register now
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
