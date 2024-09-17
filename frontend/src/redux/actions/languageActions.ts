

export const FETCH_LANGUAGES_REQUEST = 'FETCH_LANGUAGES_REQUEST';
export const FETCH_LANGUAGES_SUCCESS = 'FETCH_LANGUAGES_SUCCESS';
export const FETCH_LANGUAGES_FAILURE = 'FETCH_LANGUAGES_FAILURE';

interface FetchLanguagesRequestAction {
  type: typeof FETCH_LANGUAGES_REQUEST;
}

interface FetchLanguagesSuccessAction {
  type: typeof FETCH_LANGUAGES_SUCCESS;
  payload: Language[];
}

interface FetchLanguagesFailureAction {
  type: typeof FETCH_LANGUAGES_FAILURE;
  payload: string;
}

export type LanguageActionTypes =
  | FetchLanguagesRequestAction
  | FetchLanguagesSuccessAction
  | FetchLanguagesFailureAction;

export const fetchLanguagesRequest = (): FetchLanguagesRequestAction => ({
  type: FETCH_LANGUAGES_REQUEST,
});

export const fetchLanguagesSuccess = (languages: Language[]): FetchLanguagesSuccessAction => ({
  type: FETCH_LANGUAGES_SUCCESS,
  payload: languages,
});

export const fetchLanguagesFailure = (error: string): FetchLanguagesFailureAction => ({
  type: FETCH_LANGUAGES_FAILURE,
  payload: error,
});
