

import { Language } from '../types'; 
import { LanguageActionTypes, FETCH_LANGUAGES_REQUEST, FETCH_LANGUAGES_SUCCESS, FETCH_LANGUAGES_FAILURE } from '../actions/languageActions';

interface LanguageState {
  languages: Language[];
  loading: boolean;
  error?: string;
}

const initialState: LanguageState = {
  languages: [],
  loading: false,
  error: undefined,
};

const languageReducer = (state = initialState, action: LanguageActionTypes): LanguageState => {
  switch (action.type) {
    case FETCH_LANGUAGES_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_LANGUAGES_SUCCESS:
      return {
        ...state,
        loading: false,
        languages: action.payload,
      };
    case FETCH_LANGUAGES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default languageReducer;
