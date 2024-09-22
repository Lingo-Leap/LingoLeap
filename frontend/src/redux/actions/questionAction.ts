import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Question } from '../types'; // Adjust the import based on your file structure

export const fetchQuestions = createAsyncThunk<Question[], string  | number>(
  'questions/fetchQuestions',
  async (lessonId) => {
    const response = await axios.get(`http://localhost:1274/api/question/get/${lessonId}`);
    return response.data; 
  }
);

  
