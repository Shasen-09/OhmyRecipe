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
      return rejectWithValue(error.response?.data?.message || 'Registeration failed');
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
      return rejectWithValue(error.response?.data?.message || 'verification failed');
    }
  }
)

// 🧱 2. Initial state for auth
const initialState = {
  user: JSON.parse(localStorage.getItem('user')) || null,
  token: localStorage.getItem('token') || null,
  loading: false,
  isverified: false,
  error: null,

};

// 🧩 3. Create the auth slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.token = null;
      state.error = null;
      state.loading = false;
      state.isverified = false;
      localStorage.removeItem('token');
      localStorage.removeItem('user');
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
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Login failed';
      })

      /* For register user case */
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isverified = false;
        state.user = action.payload.user;
        localStorage.setItem('user', JSON.stringify(state.user));

      })

      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* For verification case */
      .addCase(verifyUser.pending, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(verifyUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isverified = true;
        if (state.user && action.payload?.user) {
          state.user.isverified = action.payload.user.isverified;
          localStorage.setItem('user', JSON.stringify(state.user));
        }
        if (action.payload?.token) {
          state.token = action.payload.token;
          localStorage.setItem('token', action.payload.token);
        }
      })
      .addCase(verifyUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Verification failed';
      })
  }
});

// 🔄 Export logout action and reducer
export const { logout } = authSlice.actions;
export default authSlice.reducer;
