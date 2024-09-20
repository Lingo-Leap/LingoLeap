import React from "react";
import { Provider } from "react-redux";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import { useAuth } from "./hooks/useAuth";
import { store } from "./store/store";

import "./App.css";
import Login from "./components/Login";

import Navbar from "./components/Navbar";
import QuestionChoice from "./components/QuestionChoice";
import SignUp from "./components/SignUp";
import UserProfile from "./components/UserProfile";
import AchievementsPage from "./pages/AchievementsPage";
import AdminDashboard from "./pages/AdminDashboard";
import HeroWelcome from "./pages/HeroWelcome";
import Home from "./pages/Home";

// Centralized route paths
const ROUTES = {
  HOME: "/home",
  LOGIN: "/login",
  REGISTER: "/register",
  DASHBOARD: "/admin-dashboard",
  PROFILE: "/profile",
  ACHIEVEMENTS: "/achievements",
  LESSON: "/lesson",
};

const App: React.FC = () => {
  const { isAuthenticated, logoutUser, isAdmin } = useAuth(); // Auth context

  console.log(isAdmin, "Admin check");


  // NavbarWrapper component for routes with the navigation bar
  const NavbarWrapper: React.FC = () => {
    return (
      <>
        <Navbar isAuthenticated={isAuthenticated} logout={logoutUser} />
        <div className="pb-24 mt-28 md:pb-12 md:mt-12">
          <Outlet />
        </div>
      </>
    );
  };

  // Protected route handling based on authentication and admin role
  const PrivateRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
    return isAuthenticated ? children : <Navigate to={ROUTES.LOGIN} />;
  };

  const AdminRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
    return isAuthenticated && isAdmin ? (
      children
    ) : (
      <Navigate to={ROUTES.LOGIN} />
    );
  };

  return (
    <Provider store={store}>
      <div className="App">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HeroWelcome />} />
          <Route
            path={ROUTES.LOGIN}
            element={
              !isAuthenticated ? <Login /> : <Navigate to={ROUTES.HOME} />
            }
          />
          <Route
            path={ROUTES.REGISTER}
            element={
              !isAuthenticated ? <SignUp /> : <Navigate to={ROUTES.HOME} />
            }
          />

          {/* Protected Routes with Navbar */}
          <Route element={<NavbarWrapper />}>
            <Route
              path={ROUTES.HOME}
              element={
                <PrivateRoute>
                  {isAdmin ? <Navigate to={ROUTES.DASHBOARD} /> : <Home />}
                </PrivateRoute>
              }
            />
            <Route
              path={ROUTES.DASHBOARD}
              element={
                <AdminRoute>
                  <AdminDashboard />
                </AdminRoute>
              }
            />
            <Route
              path={ROUTES.ACHIEVEMENTS}
              element={
                <PrivateRoute>
                  <AchievementsPage />
                </PrivateRoute>
              }
            />
            <Route
              path={ROUTES.PROFILE}
              element={
                <PrivateRoute>
                  <UserProfile />
                </PrivateRoute>
              }
            />
            <Route
              path={ROUTES.LESSON}
              element={
                <PrivateRoute>
                  <QuestionChoice />
                </PrivateRoute>
              }
            />
          </Route>


        </Routes>
      </div>
    </Provider>
  );
};

export default App;
