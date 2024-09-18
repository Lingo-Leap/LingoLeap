import { configureStore } from '@reduxjs/toolkit';

import languageReducer from '../redux/reducers/languageReducer';
export const store = configureStore({
  reducer: {


    language: languageReducer,
  },
});


console.log(store)
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;