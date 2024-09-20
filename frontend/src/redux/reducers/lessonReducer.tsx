
import { createSlice } from '@reduxjs/toolkit';
import { fetchLessons } from '../actions/lessonAction';

interface Lesson {
  id: number;
  title: string;
  description: string;
}

interface LessonState {
  lessons: Lesson[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: LessonState = {
  lessons: [],
  status: 'idle',
  error: null,
};

const lessonSlice = createSlice({
  name: 'lessons',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLessons.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchLessons.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.lessons = action.payload; // Stocke les leçons récupérées
      })
      .addCase(fetchLessons.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

export default lessonSlice.reducer;