import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Choice } from '../types'; // Adjust the import based on your file structure

// Fetch all choices
export const fetchChoices = createAsyncThunk<Choice[], number>(
  'choices/fetchChoices',
  async (questionId) => {
    const response = await axios.get(`http://localhost:1274/api/choice/get?questionId=${questionId}`);
    return response.data;
  }
);

// Create a new choice
export const createChoice = createAsyncThunk<Choice, Partial<Choice>>(
  'choices/createChoice',
  async (choiceData) => {
    const response = await axios.post('http://localhost:1274/api/choice/post', choiceData);
    return response.data;
  }
);

// Update a choice
export const updateChoice = createAsyncThunk<Choice, { id: number; data: Partial<Choice> }>(
  'choices/updateChoice',
  async ({ id, data }) => {
    const response = await axios.put(`http://localhost:1274/api/choice/${id}`, data);
    return response.data;
  }
);

// Delete a choice
export const deleteChoice = createAsyncThunk<void, number>(
  'choices/deleteChoice',
  async (id) => {
    await axios.delete(`http://localhost:1274/api/choice/${id}`);
  }
);
