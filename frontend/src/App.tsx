// App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
import Navbar from './components/Navbar';
import HeroWelcome from './pages/HeroWelcome';
import Questions from './components/Questions';
import UserProfile from './components/UserProfile';
import AchievementsPage from './pages/AchievementsPage';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Home from './pages/Home';
import './App.css';

const App: React.FC = () => {
  const NavbarWrapper: React.FC = () => (
    <>
      <Navbar />
      <Outlet />
    </>
  );

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
            <Route path="/lesson/:lessonId" element={<Questions />} />
            <Route path="/register" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
    
    </Provider>
  );
};

export default App;
