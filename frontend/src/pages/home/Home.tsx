// ==============================
// Importing React, Redux, and Components
// ==============================
import React, { useEffect } from "react";
import { useDispatch } from "react-redux"; // Include useDispatch for actions
import GameBar from "../../components/games/GameBar"; // Import GameBar
import Lobby from "../../components/games/LobbyLanguage"; // Lobby component to display available languages
import GameWrapper from "../../components/games/GameWrapper"; // Wrapper for the game logic
import { setTime } from "../../redux/actions/gameActions"; // Action to increment time
import useTimer from "../../hooks/useTimer"; // Import the timer hook

/**
 * Home Component
 *
 * Displays the game Navbar and the Lobby of available languages.
 * Sets up a timer to increment time every second.
 */
const Home: React.FC = () => {
  const dispatch = useDispatch();
  const { displayTimer, remainingSeconds } = useTimer(); // Get the timer value and remaining seconds from the hook

  useEffect(() => {
    // Set up a timer to increment the time every second
    const interval = setInterval(() => {
      dispatch(setTime()); // Dispatch action to increment time
    }, 1000);

    // Clear the timer on unmount to prevent memory leaks
    return () => clearInterval(interval);
  }, [dispatch]);

  return (
    <div>
      {/* Display the GameWrapper with timerValue passed to it */}
      <GameWrapper timerValue={remainingSeconds}>
        {/* Display the Navbar (GameBar with lives, energy, etc.) */}
        
        {/* Display the Lobby with available languages */}
        <Lobby />
      </GameWrapper>
      {/* Optionally display the formatted timer for user visibility */}
      <div className="timer-display">{displayTimer}</div>
    </div>
  );
};

export default Home;
