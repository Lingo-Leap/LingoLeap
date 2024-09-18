import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Routes, Route } from "react-router-dom";
import { Provider } from 'react-redux';
import { RootState, AppDispatch } from './store/store';
import { fetchLanguages } from '../src/redux/actions/languageAction'; 
import Home from './pages/Home';
import UserProfile from './components/UserProfile';
import Navbar from './components/Navbar';
import AchievementsPage from './pages/AchievementsPage';
import LanguageList from './components/LanguageList';
import { store } from './store/store';
import './App.css';

function App() {
  const dispatch: AppDispatch = useDispatch();
  const { languages, status, error } = useSelector((state: RootState) => state.language);

  useEffect(() => {
    dispatch(fetchLanguages());
  }, [dispatch]);

  return (
    <Provider store={store}>
    <div className="App">
      {/* <HeroWelcome/> */}
    <Navbar />
      {/* <h1>Languages</h1>
      <button onClick={handleFetchLanguages}>Fetch Languages</button>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <LanguageList languages={languages} />  */}
   
      {/* <UserProfile /> */}

    {/* <Progress />  */}

    <Routes>
   <Route path="/" element={<Home />} />


   <Route path="/home" element={<Home />} />
    <Route path="/achievements" element={<AchievementsPage />} />
    <Route path="/profile" element={<UserProfile />} />

   </Routes>
      </div>
    </Provider>
  );
};

export default App;

