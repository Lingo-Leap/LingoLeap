import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Routes, Route, Outlet } from "react-router-dom";
import { Provider } from 'react-redux';
import { RootState, AppDispatch } from './store/store';
import { fetchLanguages } from '../src/redux/actions/languageAction'; 
import Home from './pages/Home';
import UserProfile from './components/UserProfile';
import Navbar from './components/Navbar';
import AchievementsPage from './pages/AchievementsPage';
import Login from './components/Login';
import SignUp from './components/SignUp';
import { store } from './store/store';
import './App.css';
import HeroWelcome from './pages/HeroWelcome';
function App() {
  const dispatch: AppDispatch = useDispatch();
  const { languages, status, error } = useSelector((state: RootState) => state.language);

  useEffect(() => {
    dispatch(fetchLanguages());
  }, [dispatch]);

  const NavbarWrapper: React.FC = () => {
    return (
      <>
        <Navbar />
        <Outlet />
      </>
    );
  };

  return (
    <Provider store={store}>
      <div className="App">
        <Routes>
          <Route path="/" element={<HeroWelcome />} />
          
          <Route element={<NavbarWrapper />}>
            <Route path="/home" element={<Home />} />
            <Route path="/achievements" element={<AchievementsPage />} />
            <Route path="/profile" element={<UserProfile />} />
          </Route>

          <Route path="/register" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Provider>
  );
}

export default App;
