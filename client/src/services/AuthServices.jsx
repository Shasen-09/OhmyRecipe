import React from 'react'
import axios from 'axios';

const registerService = async (data) => {
  const response = await axios.post('/user/register', data, {
    headers: {
      'Content-Type': 'application/json',
    }
  });
  return response;
}
const loginService = async (data) => {
  const response = await axios.post('/user/login', data, {
    headers: {
      'Content-Type': 'application/json',
    }
  });
  return response;
};

const verifyService = async (data) => {
  const response = await axios.post('/user/verify', data, {
    headers: {
      'Content-Type': 'application/json',
    }
  });
  return response;
}

const homeService = async (token) => {
  const response = await axios.post('/user/home', {}, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  });
  return response;
}


const AuthServices = { registerService, loginService, verifyService, homeService }

export default AuthServices