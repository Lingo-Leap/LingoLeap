// redux/store.ts
import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../redux/reducers/userReducers';
import authReducer from './features/authSlice';
import languageReducer from '../redux/reducers/languageReducer';
import questionReducer from '../redux/reducers/languageReducer';
import lessonReducer from '../redux/reducers/lessonReducer'; // Ton nouveau reducer pour les leçons

export const store = configureStore({
  reducer: {
    user: userReducer, 
    auth: authReducer, 
    language: languageReducer,
    lessons: lessonReducer, // Incorporation du nouveau lessonReducer
    questions: questionReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;