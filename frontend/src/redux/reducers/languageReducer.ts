import { createSlice } from '@reduxjs/toolkit';
import { fetchLanguages } from '../actions/languageAction';
import { Language } from '../types';

interface LanguageState {
  languages: Language[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: LanguageState = {
  languages: [],
  status: 'idle',
  error: null,
};

const languageSlice = createSlice({
  name: 'languages',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLanguages.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchLanguages.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.languages = action.payload;
        state.error = null; 
      })
      .addCase(fetchLanguages.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch languages';
      });
  },
});

export default languageSlice.reducer;

