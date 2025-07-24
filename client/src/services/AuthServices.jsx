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
  try {
    const response = await axios.post('/user/home', {}, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    });
    return response;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      if (error.response.data.message === "Token expired, please login again") {
        localStorage.clear();
        alert("Session expired. Please log in again.");
        window.location.href = '/login';
      }
    }
    throw error;
  }
}

const AuthServices = { registerService, loginService, verifyService, homeService }

export default AuthServices;
