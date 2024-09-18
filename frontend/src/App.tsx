import React from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import type { RootState, AppDispatch } from './redux/store';
import { Routes, Route } from "react-router-dom"
import Home from './pages/Home';

import UserProfile from './components/UserProfile';
import Navbar from './components/Navbar';
import AchievementsPage from './pages/AchievementsPage';
import LoginContainer from './components/LoginContainer';
import HeroWelcome from './pages/HeroWelcome';

import { Provider } from 'react-redux';
import { store } from './store/store';
import Progress from './components/Progress';
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
     <Provider store={store}>
    <div className="App">

      <HeroWelcome/>
    <Navbar /> 
      <h1>Languages</h1>
      <button onClick={handleFetchLanguages}>Fetch Languages</button>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <LanguageList languages={languages} /> 
   
      <UserProfile />

    <Progress /> 
    <LoginContainer/>
    <Routes>
   <Route path="/" element={<Home />} />


   <Route path="/home" element={<Home />} />
    <Route path="/achievements" element={<AchievementsPage />} />

   </Routes>
      </div>
    </Provider>
  );
};

export default App;
