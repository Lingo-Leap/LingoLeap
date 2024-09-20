import { createSlice } from '@reduxjs/toolkit';
import { fetchChoices, createChoice, updateChoice, deleteChoice } from '../actions/choiceAction';
import { Choice } from '../types'; // Adjust the import based on your file structure

interface ChoiceState {
  choices: Choice[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: ChoiceState = {
  choices: [],
  status: 'idle',
  error: null,
};

const choiceSlice = createSlice({
  name: 'choices',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchChoices.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchChoices.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.choices = action.payload;
        state.error = null; 
      })
      .addCase(fetchChoices.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch choices';
      })
      .addCase(createChoice.fulfilled, (state, action) => {
        state.choices.push(action.payload);
      })
      .addCase(updateChoice.fulfilled, (state, action) => {
        const index = state.choices.findIndex(choice => choice.id === action.payload.id);
        if (index !== -1) {
          state.choices[index] = action.payload;
        }
      })
      .addCase(deleteChoice.fulfilled, (state, action) => {
        state.choices = state.choices.filter(choice => choice.id !== action.meta.arg);
      });
  },
});

export default choiceSlice.reducer;
