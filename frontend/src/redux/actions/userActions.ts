import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchUserProfile = createAsyncThunk(
  'user/fetchUserProfile',
  async (id: number, thunkAPI) => {
    try {
      const response = await axios.get(`http://localhost:1274/api/user/${id}`);
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
  async ({ id, username, email, profilePicture }: { id: number; username: string; email: string; profilePicture: string }) => {
    const response = await axios.put(`http://localhost:1274/api/user/update/${id}`, { username, email, profilePicture });
    return response.data;
  }
);