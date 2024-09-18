import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Routes, Route } from "react-router-dom";
import { Provider } from 'react-redux';
import { RootState, AppDispatch } from './store/store';
import { fetchLanguages } from '../src/redux/actions/languageAction'; 
import Home from './pages/Home';
import UserProfile from './components/UserProfile';

import AchievementsPage from './pages/AchievementsPage';
import LanguageList from './components/LanguageList';
import { store } from './store/store';
import './App.css';
import HeroWelcome from './pages/HeroWelcome';
function App() {
  const dispatch: AppDispatch = useDispatch();
  const { languages, status, error } = useSelector((state: RootState) => state.language);

  useEffect(() => {
    dispatch(fetchLanguages());
  }, [dispatch]);

  return (
    <Provider store={store}>
      <div className="App">
        <HeroWelcome />
       
        <h1>Languages</h1>
        {status === 'loading' && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
        <LanguageList languages={languages} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/achievements" element={<AchievementsPage />} />
          <Route path="/profile" element={<UserProfile />} />

        </Routes>
      </div>
    </Provider>
  );
};

export default App;

