// ==============================
// Importing React and Types
// ==============================
import React from "react";
import { GameWrapperProps } from "../../types/types"; // Import the separated type

// ==============================
// Importing Components
// ==============================
import GameBar from "./GameBar";

/**
 * GameWrapper Component
 *
 * Wraps the children components with the GameBar.
 */
const GameWrapper: React.FC<GameWrapperProps> = ({ children, timerValue }) => {
  return (
    <>
      <GameBar timerValue={timerValue}/>
      <div>{children}</div>
    </>
  );
};

export default GameWrapper;
