import { createStore,  combineReducers } from 'redux';

import languageReducer from './reducers/languageReducer';


const rootReducer = combineReducers({
  language: languageReducer,
});


const store = createStore(rootReducer);

// Define AppDispatch type based on the store's dispatch method
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export default store;
