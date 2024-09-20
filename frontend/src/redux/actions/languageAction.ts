import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Language } from '../types';

export const fetchLanguages = createAsyncThunk<Language[], void>(
  'languages/fetchLanguages',
  async () => {
    const response = await axios.get('http://localhost:1274/api/language/get'); 

    return response.data; 
   
  }
);
