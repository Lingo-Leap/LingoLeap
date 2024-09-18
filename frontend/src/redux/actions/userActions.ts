import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchUserProfile = createAsyncThunk(
  'user/fetchUserProfile',
  async (id: number) => {
    const response = await axios.get(`http://localhost:1274/api/user/${id}`);
    return response.data;
  }
);

export const updateUserProfile = createAsyncThunk(
  'user/updateUserProfile',
  async ({ id, username, email, profilePicture }: { id: number; username: string; email: string; profilePicture: string }) => {
    const response = await axios.put(`http://localhost:1274/api/user/update/${id}`, { username, email, profilePicture });
    return response.data;
  }
);