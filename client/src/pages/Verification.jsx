import { faEnvelopeCircleCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import AuthServices from '../services/AuthServices'
import { verifyUser } from '../redux/store/authSlice'

const Verification = () => {
  const dispatch = useDispatch();
  const [otp, setOTP] = useState('');
  const user = JSON.parse(localStorage.getItem('user'));
  const email = user?.email;

  const { loading, error, isverified } = useSelector(state => state.auth)

  const navigate = useNavigate();

  useEffect(() => {
    if (isverified) {
      navigate('/home')
    }
  }, [isverified, navigate])

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
    dispatch(verifyUser(data));

  }

  return (
    <div className='flex flex-col justify-center items-center min-h-screen bg-gray-100'>
      <form className='grid gap-5 border-2 p-20 rounded-t ' onSubmit={verifyOTP}>
        <FontAwesomeIcon icon={faEnvelopeCircleCheck} className='text-[200px] text-green-600 mx-auto mb-4 ' />
        <p>OTP has been sent to your mail</p>
        <input type='text' placeholder='Enter OTP' className='border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-700' onChange={(e) => setOTP(e.target.value)} disabled={loading} />
        <button
          type='submit'
          className='bg-green-600 text-white font-bold rounded-md py-2 hover:bg-green-700 transition duration-200'
          disabled={loading}
        >
          {loading ? 'Verifying...' : 'Confirm'}
        </button>
        {error && <p className='text-red-600 mt-2'>{error}</p>}
      </form>
    </div>
  )
}

export default Verification