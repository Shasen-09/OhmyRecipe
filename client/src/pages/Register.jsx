import { faIdCard } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import AuthServices from '../services/AuthServices'
import { registerUser } from '../redux/store/authSlice';

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, user, isverified } = useSelector(state => state.auth);

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpassword, setConfirmPassword] = useState('');
  const [contact, setContact] = useState('');

  useEffect(() => {
    if (user && !isverified) {
      navigate('/verify')
    }
  }, [user, isverified, navigate])

  const registerHandler = async (e) => {
    e.preventDefault();

    if (!username || !email || !password || !confirmpassword || !contact) {
      alert("Please fill all fields");
      return;
    }
    if (password !== confirmpassword) {
      alert("Password don't match")
      return;
    }
    const userData = { username, email, password, confirmpassword, contact }
    dispatch(registerUser(userData))

  }

  return (
    <div className="flex min-h-screen">
      {/* Left Panel */}
      <div className="w-1/2 bg-gradient-to-br from-red-700 to-red-400 text-white p-10 flex flex-col justify-center items-center">
        <FontAwesomeIcon icon={faIdCard} className="text-[120px] mb-6" />
        <h2 className="text-3xl font-bold mb-2">Welcome to Our Portal!</h2>
        <p className="text-center max-w-sm">Join us by creating your account. Enjoy fast access and more features.</p>
      </div>

      {/* Right Panel */}
      <div className="w-1/2 bg-white flex items-center justify-center">
        <form
          onSubmit={registerHandler}
          className="bg-white p-10 rounded-lg shadow-xl w-full max-w-md space-y-5"
        >
          <h2 className="text-2xl font-bold text-red-600 text-center">Create Account</h2>

          <input
            type='text'
            placeholder='Enter your name'
            className='w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            type='email'
            placeholder='Enter your email'
            className='w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type='password'
            placeholder='Enter your password'
            className='w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <input
            type='password'
            placeholder='Confirm your password'
            className='w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400'
            value={confirmpassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <input
            type='text'
            placeholder='Enter your contact number'
            className='w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400'
            value={contact}
            onChange={(e) => setContact(e.target.value)}
          />

          <button
            type='submit'
            disabled={loading}
            className={`w-full bg-red-600 text-white font-bold py-2 rounded-md transition duration-200 ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-red-700'}`}
          >
            {loading ? 'Registering...' : 'Register'}
          </button>

          {error && <p className="text-red-600 text-sm text-center">{error}</p>}
        </form>
      </div>
    </div>
  )
}

export default Register