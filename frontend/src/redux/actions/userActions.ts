import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchUserProfile = createAsyncThunk(
  'user/fetchUserProfile',
  async (_, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as any;
      const token = state.auth.token;
      const response = await axios.get(`http://localhost:1274/api/user/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }); 
      console.log("Fetched user profile:", response.data); // Debug log
      return response.data;
    } catch (error: any) {
      console.error("Error fetching user profile:", error); // Debug log
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const updateUserProfile = createAsyncThunk(
  'user/updateUserProfile',
  async ({ userId , username, email, currentPassword, newPassword, confirmPassword }: { userId: number; username: string; email: string; currentPassword: string; newPassword: string; confirmPassword: string }, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as any;
      const token = state.auth.token;

      if (!token) {
        throw new Error("Token is missing");  
      }

      const data: { username: string; email: string; currentPassword: string; newPassword: string; confirmPassword: string } = { username, email  , currentPassword, newPassword, confirmPassword };
      console.log("Data being sent to update user profile:", data);
      const response = await axios.put(`http://localhost:1274/api/user/update/${userId}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (error: any) {
      console.error("Error updating user profile:", error); // Debug log
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);


