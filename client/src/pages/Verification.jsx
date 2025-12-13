import { faEnvelopeCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { verifyUser } from '../redux/store/authSlice';
import axios from 'axios';

const Verification = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));
  const email = user?.email;

  const { loading, error, isVerified } = useSelector(state => state.auth);
  const [otp, setOtp] = useState(Array(6).fill(''));
  const [timer, setTimer] = useState(60);
  const [resendLoading, setResendLoading] = useState(false);
  const inputs = useRef([]);


  useEffect(() => {
    if (timer <= 0) return;
    const interval = setInterval(() => setTimer(t => t - 1), 1000);
    return () => clearInterval(interval);
  }, [timer]);


  useEffect(() => {
    if (isVerified) navigate('/home');
  }, [isVerified, navigate]);

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (/^\d?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      if (value && index < 5) inputs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  const handleVerify = (e) => {
    e.preventDefault();
    if (!email) {
      alert('Email missing. Please register first.');
      localStorage.clear();
      navigate('/register');
      return;
    }
    if (otp.some(d => d === '')) {
      alert('Please enter the full 6-digit OTP.');
      return;
    }
    dispatch(verifyUser({ email, otp: otp.join('') }));

  };

  const handleResend = async () => {
    if (!email) {
      alert('Email not found. Please register first.');
      localStorage.clear();
      navigate('/register');
      return;
    }

    if (resendLoading) return;
    setResendLoading(true);

    try {
      const response = await axios.post('/user/send-otp', { email });

      if (response.data.success) {
        setOtp(Array(6).fill(''));
        setTimer(60);
        inputs.current[0]?.focus();
        alert('OTP resent to your email!');
      } else {
        alert(response.data.message || 'Failed to resend OTP');
      }
    } catch (err) {
      console.error('Resend OTP error:', err);
      alert('Resend OTP failed. Please try again.');
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f3f4f6] px-4">
      <div className="bg-white p-10 rounded-lg shadow-xl text-center w-full max-w-md">
        <FontAwesomeIcon icon={faEnvelopeCircleCheck} className="text-5xl text-blue-600 mb-4" />
        <h2 className="text-xl font-bold mb-2 text-gray-800">OTP Verification</h2>
        <p className="text-sm text-gray-600 mb-6">
          Please enter the 6-digit OTP sent to your email.
        </p>

        <form onSubmit={handleVerify} className="space-y-5">
          <div className="flex justify-between gap-2">
            {otp.map((digit, idx) => (
              <input
                key={idx}
                type="text"
                maxLength="1"
                value={digit}
                ref={el => (inputs.current[idx] = el)}
                onChange={e => handleChange(e, idx)}
                onKeyDown={e => handleKeyDown(e, idx)}
                className="w-10 h-12 md:w-12 md:h-14 text-center border border-gray-300 rounded-md text-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            ))}
          </div>

          <div className="text-sm text-gray-500">
            {timer > 0 ? (
              <>Resend code in <span className="font-semibold">{timer}s</span></>
            ) : (
              <button
                type="button"
                className={`text-blue-600 hover:underline ${resendLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                onClick={handleResend}
                disabled={resendLoading}
              >
                {resendLoading ? 'Resending...' : 'Resend Code'}
              </button>
            )}
          </div>

          {error && <p className="text-red-600 text-sm">{error}</p>}

          <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
            disabled={loading}
          >
            {loading ? 'Verifying...' : 'Verify'}
          </button>

          <button
            type="button"
            onClick={() => {
              localStorage.clear();
              navigate('/register');
            }}
            className="text-sm text-blue-600 hover:underline"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default Verification;
