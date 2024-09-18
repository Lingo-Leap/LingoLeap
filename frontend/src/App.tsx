import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Routes, Route } from "react-router-dom";
import type { RootState, AppDispatch } from './store/store';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import AchievementsPage from './pages/AchievementsPage';
import LoginContainer from './components/LoginContainer';
import HeroWelcome from './pages/HeroWelcome';
import LanguageList from './components/LanguageList';
import { fetchLanguagesRequest, fetchLanguagesSuccess, fetchLanguagesFailure } from '../src/redux/actions/languageAction'; 
import './App.css';
import { Provider } from 'react-redux';
import { store } from './store/store';

function App() {
  const dispatch: AppDispatch = useDispatch();
  const { languages, loading, error } = useSelector((state: RootState) => state.language);

  useEffect(() => {
    const fetchLanguages = async () => {
      dispatch(fetchLanguagesRequest());
      try {
        const response = await fetch("http://localhost:1274/api/language/get");
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        dispatch(fetchLanguagesSuccess(data));
      } catch (err: unknown) {
        if (err instanceof Error) {
          dispatch(fetchLanguagesFailure(err.message));
        } else {
          dispatch(fetchLanguagesFailure("An unknown error occurred"));
        }
      }
    };

    fetchLanguages();
  }, [dispatch]);

  return (
    <Provider store={store}>
    <div className="App">
      {/* <HeroWelcome/> */}
    {/* <Navbar /> */}
     <h1>Languages</h1>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <LanguageList languages={languages} /> 
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    
    {/* // <Progress />  */}
   
    <Routes>
   <Route path="/" element={<Home />} />
   <Route path="/home" element={<Home />} />
    <Route path="/achievements" element={<AchievementsPage />} />
   {/* <Route path="/profile" element ={<Profile />}/> */}
   </Routes>
      </div>
    </Provider>
  );
};

export default App;
