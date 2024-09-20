import React from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import { RootState, AppDispatch } from './store/store';
import { fetchLanguages } from '../src/redux/actions/languageAction'; 
import LanguageList from './components/LanguageList';
import LogOutButton from './components/LogoutButton';
import { Provider } from "react-redux";
import { store } from "./store/store";
import Home from "./pages/Home";
import UserProfile from "./components/UserProfile";
import Navbar from "./components/Navbar";
import HeroWelcome from "./pages/HeroWelcome";
import AchievementsPage from "./pages/AchievementsPage";
import Login from "./components/Login";
import AdminDashboard from "./pages/AdminDashboard";
import SignUp from "./components/SignUp";
// import QuestionChoice from "./components/QuestionChoice";
import "./App.css";

function App() {
  const NavbarWrapper: React.FC = () => {
    return (
      <>
        {/* Navbar Component */}
        <Navbar />
        {/* Outlet for rendering child routes */}
        <div className="pb-24 mt-28 md:pb-12 md:mt-12">
          {/* Padding for mobile views and top margin to ensure space for mobile */}
          <Outlet />
        </div>
      </>
    );
  };

  return (
    <Provider store={store}>
      <div className="App">
        <Routes>
          <Route path="/" element={<HeroWelcome />} />

          {/* NavbarWrapper for routes with the Navbar */}
          <Route element={<NavbarWrapper />}>
            <Route path="/home" element={<Home />} />
            <Route path="/achievements" element={<AchievementsPage />} />
            <Route path="/profile" element={<UserProfile />} />
          </Route>

          <Route path="/register" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path ="/admin" element={<AdminDashboard/>}/>
          {/* <Route path="/lesson" element={<QuestionChoice />} /> */}

        </Routes>
      </div>
    </Provider>
  );
};

export default App;
