
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import languageReducer from './reducers/languageReducer';

const store = createStore(languageReducer, applyMiddleware(thunk));

export default store;
