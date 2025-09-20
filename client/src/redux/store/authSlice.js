import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AuthServices from "../../services/AuthServices";


export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await AuthServices.loginService(credentials);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Login Failed');
    }
  }
);

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await AuthServices.registerService(userData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Registration Failed');
    }
  }
);

export const verifyUser = createAsyncThunk(
  'auth/verifyUser',
  async (data, { rejectWithValue }) => {
    try {
      const response = await AuthServices.verifyService(data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Verification Failed');
    }
  }
);


const initialState = {
  user: JSON.parse(localStorage.getItem('user')) || null,
  token: localStorage.getItem('token') || null,
  loading: false,
  isVerified: localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user')).isVerified
    : false,
  error: null,
};


const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.token = null;
      state.isVerified = false;
      state.error = null;
      state.loading = false;
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    }
  },
  extraReducers: (builder) => {
    builder

      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        const { token, user } = action.payload;

        state.user = user;
        state.token = token;
        state.isVerified = user.isVerified;

        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('token', token);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Login failed';
      })


      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        const { user, token } = action.payload;

        state.user = user;
        state.token = token || null;
        state.isVerified = user.isVerified;

        localStorage.setItem('user', JSON.stringify(user));
        if (token) localStorage.setItem('token', token);
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Registration failed';
      })


      .addCase(verifyUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyUser.fulfilled, (state, action) => {
        state.loading = false;
        const { user: verifiedUser, token } = action.payload;

        if (state.user) {
          state.user = { ...state.user, ...verifiedUser };
          localStorage.setItem('user', JSON.stringify(state.user));
        }

        if (token) {
          state.token = token;
          localStorage.setItem('token', token);
        }
      })
      .addCase(verifyUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Verification failed';
      });
  }
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
