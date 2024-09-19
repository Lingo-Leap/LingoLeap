
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../store';
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

// Async Thunk for user login
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
export const updateUserProfile = createAsyncThunk(
  'auth/updateUserProfile',
  async (updatedData: { userId: string; username: string; email: string; currentPassword ?: string; newPassword ?: string; confirmPassword ?: string  }, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as RootState;
      const response = await axios.put(`http://127.0.0.1:1274/api/user/profile/${updatedData.userId}`, updatedData, {
        headers: {
          Authorization: `Bearer ${state.auth.token}`,
        },
      });
      return response.data;
    } catch (error: any) {
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
      })
      .addCase(updateUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        // Optionally update the state with new profile data
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
  
  }
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
