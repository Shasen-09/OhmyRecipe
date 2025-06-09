import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import AuthServices from '../services/AuthServices';


const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loginHandler = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }

    const data = { email, password }
    try {
      const res = await AuthServices.loginService(data);
      const { token, user } = res.data;
      console.log(res.data);
      if (!user.isverified) {
        alert("User is not verified")
        return;
      }
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      navigate('/home');

    } catch (error) {
      console.log(error)
    }



  };


  return (
    <div className='flex flex-col justify-center items-center min-h-screen bg-gray-100 '>
      <div className='grid gap-5 border-2 p-20 rounded-t items-center justify-center
      '>
        <FontAwesomeIcon icon={faCircleUser} className="text-[200px] text-blue-600 mx-auto mb-4 " />
        <input type='text' placeholder='Enter your email' className='border border-gray-300 rounded-md  px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400' value={email} onChange={(e) => { setEmail(e.target.value) }} />
        <input type='text' placeholder='Enter your password' className='border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400' value={password} onChange={(e) => { setPassword(e.target.value) }} />
        <button className=' rounded-md bg-blue-600 text-white font-bold py-2 hover:bg-blue-700 transition duration-200' onClick={(e) => loginHandler(e)}>Log in</button>
        <p>Don't have an account?  <Link to='/register' className='text-blue-600 hover:underline'>Register now</Link> </p>

      </div>

    </div>
  )
}

export default Login