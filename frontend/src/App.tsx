import React from "react";
import { Provider } from "react-redux";
import { Outlet, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import SignUp from "./components/SignUp";
import UserProfile from "./components/UserProfile";
import AchievementsPage from "./pages/AchievementsPage";
import HeroWelcome from "./pages/HeroWelcome";
import Home from "./pages/Home";
import { store } from "./store/store";

function App() {
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
