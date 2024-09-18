import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/userSlice';
import authReducer from './features/authSlice'; 

export const store = configureStore({
  reducer: {
    user: userReducer, 
    auth: authReducer, 
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

