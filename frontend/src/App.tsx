import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from './redux/store';
import { fetchLanguagesRequest, fetchLanguagesSuccess, fetchLanguagesFailure } from './redux/actions/languageActions'; 
import './App.css';
import LanguageList from './components/LanguageList'; // Ensure correct import

function App() {
  const dispatch: AppDispatch = useDispatch();
  const { languages, loading, error } = useSelector((state: RootState) => state.language);

  const handleFetchLanguages = () => {
    dispatch(fetchLanguagesRequest());

    // Here you would typically call an API and dispatch success or failure actions based on the result
    // Example:
    /*
    fetch('your-api-endpoint')
      .then(response => response.json())
      .then(data => dispatch(fetchLanguagesSuccess(data)))
      .catch(err => dispatch(fetchLanguagesFailure(err.message)));
    */
  };

  return (
    <div className="App">
      <h1>Languages</h1>
      <button onClick={handleFetchLanguages}>Fetch Languages</button>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <LanguageList languages={languages} /> {/* Pass languages to LanguageList if needed */}
    </div>
  );
}

export default App;
