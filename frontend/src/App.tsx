// ==============================
// Import Statements
// ==============================

// React and related libraries
import React from "react";
import { Provider } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";

// Custom hooks and state management
import { useAuth } from "./hooks/useAuth";
import { store } from "./redux/store/store";
import useTimer from "./hooks/useTimer";


// Component Imports
import GameBar from "./components/games/GameBar";
import Navbar from "./components/layout/Navbar";

// Route configuration and type definitions
import { ROUTES } from "./config/routesConfig"; // Import ROUTES array
import { RouteConfig } from "./types/RouteConfig";

// ==============================
// Component Definitions
// ==============================

/**
 * GameWrapper Component
 * Wraps game-related components with the GameBar.
 *
 * @param {React.ReactNode} children - Child components to be wrapped.
 * @returns JSX.Element
 */

const GameWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <>
    <GameBar timerValue={3} /> {/* Placeholder for timer value */}
    <div>{children}</div>
  </>
);

/**
 * AdminWrapper Component
 * Wraps admin dashboard components with full-screen styling using Tailwind CSS.
 *
 * @param {React.ReactNode} children - Child components to be wrapped.
 * @returns JSX.Element
 */
const AdminWrapper: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <div className="flex flex-col min-h-screen bg-gray-100"></div>;
};

/**
 * NavbarWrapper Component
 * Wraps components with the Navbar and applies consistent styling.
 *
 * @param {React.ReactNode} children - Child components to be wrapped.
 * @returns JSX.Element
 */
const NavbarWrapper: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { isAuthenticated, logoutUser } = useAuth();
  return (
    <>
      <Navbar isAuthenticated={isAuthenticated} logout={logoutUser} />
      <div className="pb-24 mt-28 md:pb-12 md:mt-12">{children}</div>
    </>
  );
};

const LayoutWrapper: React.FC<{
  children: React.ReactNode;
  withNavbar?: boolean;
  useGameLayout?: boolean;
  forAdmin?: boolean; // Add forAdmin flag
}> = ({ children, withNavbar, useGameLayout, forAdmin }) => {
  let content = children;

  // Admin-specific layout customization (with navbar)
  if (forAdmin) {
    content = (
      <NavbarWrapper>
        <AdminWrapper>{content}</AdminWrapper>
      </NavbarWrapper>
    );
  }

  // Game layout handling
  if (useGameLayout) {
    content = <GameWrapper>{content}</GameWrapper>;
  }

  // General navbar layout
  if (withNavbar && !forAdmin) {
    content = <NavbarWrapper>{content}</NavbarWrapper>;
  }

  return <>{content}</>;
};

/**
 * ProtectedRoute Component
 * Guards routes based on authentication and authorization.
 *
 * @param {React.ReactNode} children - Child components to be rendered if access is granted.
 * @param {boolean} [isProtected] - Flag indicating if route requires authentication.
 * @param {boolean} [forAdmin] - Flag indicating if route is restricted to admin users.
 * @returns JSX.Element
 */
const ProtectedRoute: React.FC<{
  children: React.ReactNode;
  isProtected?: boolean;
  forAdmin?: boolean;
}> = ({ children, isProtected, forAdmin }) => {
  const { isAuthenticated, isAdmin } = useAuth();

  // Redirect to login if route is protected and user is not authenticated
  if (isProtected && !isAuthenticated) return <Navigate to="/login" replace />;

  // Redirect to login if route is admin-only and user is not an admin
  if (forAdmin && !isAdmin) return <Navigate to="/login" replace />;

  // Render child components if access is granted
  return <>{children}</>;
};

// ==============================
// Main App Component
// ==============================

/**
 * App Component
 * Sets up the application with routing, state management, and layout configurations.
 *
 * @returns JSX.Element
 */
const App: React.FC = () => {
  return (
    // Provide the Redux store to the entire application
    <Provider store={store}>
      <div className="App">
        {/* Define application routes */}
        <Routes>
          {ROUTES.map(
            ({
              path,
              component,
              isProtected,
              forAdmin,
              withNavbar,
              useGameLayout,
            }: RouteConfig) => (
              <Route
                key={path}
                path={path}
                element={
                  // Apply route protection based on configuration
                  <ProtectedRoute isProtected={isProtected} forAdmin={forAdmin}>
                    {/* Apply layout based on configuration */}
                    <LayoutWrapper
                      withNavbar={withNavbar}
                      useGameLayout={useGameLayout}
                    >
                      {component}
                    </LayoutWrapper>
                  </ProtectedRoute>
                }
              />
            )
          )}
          {/* Fallback route for undefined paths */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Provider>
  );
};

export default App;
