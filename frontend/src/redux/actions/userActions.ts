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
  async (updatedData: { username: string; email: string }, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as any;
      const token = state.auth.token;
      const response = await axios.put(`http://localhost:1274/api/user/update/profile`, updatedData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const updateUserPassword = createAsyncThunk(
  'user/updateUserPassword',
  async (updatedData: {  currentPassword: string; newPassword: string }, thunkAPI) => {
    try {
      
      const state = thunkAPI.getState() as any;
      const token = state.auth.token;
      console.log("Sending password update request:", updatedData);
      const response = await axios.put(`http://localhost:1274/api/user/update/password`, updatedData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Password updated successfully:", response.data);
      return response.data;
    } catch (error: any) {
      console.error("Error updating password:", error);
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);