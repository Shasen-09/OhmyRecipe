import { faIdCard } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthServices from '../services/AuthServices'

const Register = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpassword, setConfirmPassword] = useState('');
  const [contact, setContact] = useState('');

  //register
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
    const data = { username, email, password, confirmpassword, contact }
    try {
      const res = await AuthServices.registerService(data);
      console.log(res.data, email)
      navigate('/verify', { state: { email } })
    } catch (error) {
      console.log(error)
    }

  }

  return (
    <>
      <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100'>
        <div className=' flex gap-15 border-2 p-20 rounded-t items-center justify-center '>
          <FontAwesomeIcon icon={faIdCard} className='text-[200px] text-red-600 mx-auto mb-4' />
          <div className='grid gap-5'>
            <input type='text' placeholder='Enter your name' className='border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400' value={username}
              onChange={(e) => setUsername(e.target.value)} />

            <input type='text' placeholder='Enter your email' className='border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400' value={email}
              onChange={(e) => { setEmail(e.target.value) }} />

            <input type='text' placeholder='Enter your password' className='border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400' value={password}
              onChange={(e) => { setPassword(e.target.value) }} />

            <input type='text' placeholder='Confirm your pasword' className='border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400' value={confirmpassword} onChange={(e) => { setConfirmPassword(e.target.value) }} />

            <input type='text' placeholder='Enter your contact' className='border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400' value={contact} onChange={(e) => { setContact(e.target.value) }} />

            <button onClick={(e) => { registerHandler(e) }} className='bg-red-600 text-white font-bold py-2 rounded-md hover:bg-red-700 transition duration-200'>Register</button>
          </div>

        </div>
      </div>
    </>
  )
}

export default Register