import { faEnvelopeCircleCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import AuthServices from '../services/AuthServices'

const Verification = () => {
  const [otp, setOTP] = useState('');
  const [isverified, setIsVerified] = useState(false);
  const location = useLocation();
  const email = location.state?.email;

  const navigate = useNavigate();

  const verifyOTP = async (e) => {
    e.preventDefault();
    if (!email) {
      alert('Email is missing. Please register first.');
      navigate('/register');
      return;
    }
    if (!otp) {
      alert("Please enter your OTP!")
    }
    const data = { email, otp }
    try {
      const res = await AuthServices.verifyService(data);
      console.log(res.data);

      // Make sure your backend sends { success: true } or false accordingly
      if (res.data.success) {
        setIsVerified(true);
        alert("Verification successful!");
        navigate('/home', { state: { isverified: true } });
      } else {
        alert(res.data.message || "Invalid OTP. Please try again.");
      }
    } catch (error) {
      console.error('Verification error:', error);
      alert("Something went wrong. Please try again later.");
    }

  }

  return (
    <div className='flex flex-col justify-center items-center min-h-screen bg-gray-100'>
      <div className='grid gap-5 border-2 p-20 rounded-t '>
        <FontAwesomeIcon icon={faEnvelopeCircleCheck} className='text-[200px] text-green-600 mx-auto mb-4 ' />
        <p>OTP has been sent to your mail</p>
        <input type='text' placeholder='Enter OTP' className='border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-700' onChange={(e) => setOTP(e.target.value)} />
        <button className='bg-green-600 text-white font-bold rounded-md py-2 hover:bg-green-700 transition duration-200' onClick={(e) => verifyOTP(e)}>Confirm</button>
      </div>
    </div>
  )
}

export default Verification