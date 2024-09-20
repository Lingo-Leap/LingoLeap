import { createSlice } from '@reduxjs/toolkit';
import { fetchQuestions } from '../actions/questionAction';
import { Question } from '../types';

interface QuestionState {
  questions: Question[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  
}

const initialState: QuestionState = {
  questions: [],
  status: 'idle',
  error: null,
};

const questionSlice = createSlice({
  name: 'questions',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuestions.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchQuestions.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.questions = action.payload;
        state.error = null; 
      })
      .addCase(fetchQuestions.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch questions';
      });
  },
});

export default questionSlice.reducer;
