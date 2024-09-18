import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../redux/reducers/userReducers';
import authReducer from './features/authSlice'; 
// import counterReducer from './features/counterSlice';

import languageReducer from '../redux/reducers/languageReducer';
export const store = configureStore({
  reducer: {
    user: userReducer, 
    auth: authReducer, 


    language: languageReducer,
  },
});



// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
