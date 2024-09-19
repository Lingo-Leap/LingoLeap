
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface AuthState {
  token: string | null;
  userId: number | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  token: null,
  userId: null,
  loading: false,
  error: null,
};


export const login = createAsyncThunk(
  'auth/login',
  async (credentials: { email: string, passwordHash: string }, thunkAPI) => {
    try {
      const response = await axios.post('http://127.0.0.1:1274/api/user/login', credentials);
      console.log("login success", response.data)
      return response.data;  
    } catch (error: any) {
      console.log("error", error);
      
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

// Async Thunk for user signup
export const signup = createAsyncThunk(
  'auth/signup',
  async (formData: FormData, thunkAPI) => {
    try {
      const response = await axios.post('http://127.0.0.1:1274/api/user/register', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log("Register success:", response.data);

      return response.data;
    } catch (error: any) {
      console.error("Register failed:", error.response.data.message);
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
      state.userId = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token; // Store the token
        state.userId = action.payload.userId;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(signup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signup.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(signup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || 'Signup failed'; 
      });
  }
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
