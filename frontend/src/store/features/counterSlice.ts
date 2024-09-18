// // src/features/counterSlice.ts
// import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// interface CounterState {
//   value: number;
// }

// const initialState: CounterState = {
//   value: 0,
// };

// const counterSlice = createSlice({
//   name: 'counter',
//   initialState,
//   reducers: {
//     increment: (state) => {
//       state.value += 1;
//     },
//     decrement: (state) => {
//       state.value -= 1;
//     },
//     incrementByAmount: (state, action: PayloadAction<number>) => {
//       state.value += action.payload;
//     },
//   },
// });

// export const { increment, decrement, incrementByAmount } = counterSlice.actions;

// export default counterSlice.reducer;
// src/features/dataSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export interface RootState {
  counter: DataState;
  user: UserState; // Add user state
}
// Define the type for the data you expect to fetch
interface Data {
  id: number;
  name: string;
  // Add other fields based on your API response
}
interface UserState {
  id: number;
  name: string;
  // Add other fields based on your requirements
}

interface DataState {
  data: Data[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

// Initial state
const initialState: DataState = {
  data: [],
  status: 'idle',
  error: null,
};

// Define the async thunk
export const fetchData = createAsyncThunk<Data[]>(
  'data/fetchData',
  async (endpoint:any) => {
    const response = await axios.get(endpoint);
    return response.data;
  }
);

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch data';
      });
  },
});

export default dataSlice.reducer;
