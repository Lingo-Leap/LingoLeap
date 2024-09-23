// ==============================
// Importing React, Redux, and Components
// ==============================
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import Navbar from "../../components/games/GameBar"; // Navbar component for displaying game bar (lives, etc.)
import Lobby from "../../components/games/LobbyLanguage"; // Lobby component to display available languages

// ==============================
// Importing Actions
// ==============================
import { setTime } from "../../redux/actions/gameActions"; // Action to increment time

/**
 * Home Component
 *
 * Displays the game Navbar and the Lobby of available languages.
 * Sets up a timer to increment time every second.
 */
const Home: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // Set up a timer to increment the time every second
    const interval = setInterval(() => {
      dispatch(setTime());
    }, 1000);

    // Clear the timer on unmount to prevent memory leaks
    return () => clearInterval(interval);
  }, [dispatch]);

  return (
    <div>
      {/* Display the Navbar (game bar with lives, energy, etc.) */}
      <Navbar />

      {/* Display the Lobby with available languages */}
      <Lobby />
    </div>
  );
};

export default Home;
