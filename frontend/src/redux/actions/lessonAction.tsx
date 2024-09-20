// redux/actions/lessonActions.ts
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Fetch des leçons
export const fetchLessons = createAsyncThunk(
  'lessons/fetchLessons',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get('http://localhost:1274/api/lessons/get');
      console.log('Leçons récupérées:', response.data); // Log pour debug
      return response.data;
    } catch (error: any) {
      console.error('Erreur lors du fetch des leçons:', error); // Log pour debug
      return thunkAPI.rejectWithValue(error.response?.data?.message || 'Erreur inconnue');
    }
  }
);

