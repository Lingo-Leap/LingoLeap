import { createSlice } from '@reduxjs/toolkit';

interface UserState {
  progress: {
    completedLessons: number;
    percentage: number;
  };
  totalPoints: number;
}

const initialState: UserState = {
  progress: {
    completedLessons: 0,
    percentage: 0,
  },
  totalPoints: 0,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // Define your reducers here
  },
});

export const { actions, reducer: userReducer } = userSlice;
export default userReducer;