// GameBar.tsx
import React, { useEffect, useState } from "react"; 
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store/store";
import { ReactComponent as CoeurIcon } from "../../assets/icons/coeur.svg";
import { ReactComponent as Piece } from "../../assets/icons/euro.svg";
import { ReactComponent as MortIcon } from "../../assets/icons/toxique.svg";
import { incrementLives } from "../../redux/actions/gameActions";

interface GameBarProps {
  initialTimerValue: number; // Expect initial timer value as a prop
}

const GameBar: React.FC<GameBarProps> = ({ initialTimerValue }) => {
  const dispatch = useDispatch();
  const lives = useSelector((state: RootState) => state.game.lives);
  const energy = useSelector((state: RootState) => state.game.energy);
  const coins = useSelector((state: RootState) => state.game.coins);
  const extraLives = useSelector((state: RootState) => state.game.extraLives);
  
  const [timerValue, setTimerValue] = useState(initialTimerValue);

  // Format the timer in MM:SS
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    setTimerValue(initialTimerValue); // Set the initial timer value on mount
  }, [initialTimerValue]);

  useEffect(() => {
    if (timerValue > 0) {
      const timer = setInterval(() => {
        setTimerValue(prev => prev - 1);
      }, 1000);

      return () => clearInterval(timer);
    } else if (timerValue === 0 && lives < extraLives.max) {
      dispatch(incrementLives());
      setTimerValue(initialTimerValue); // Reset the timer
    }
  }, [timerValue, dispatch, extraLives.max, initialTimerValue]);

  return (
    <div className="flex flex-col items-center justify-center px-4 py-4 md:flex-row md:space-x-4">
      <div className="flex flex-col items-center justify-center px-4 py-4 md:flex-row md:space-x-4">
        {/* Lives Section */}
        <div className="flex items-center p-2 rounded-full shadow-md bg-duolingoDark2">
          <div className="flex items-center space-x-2">
            {[...Array(5)].map((_, index) => (
              <div key={index} className="flex items-center">
                {index < lives ? (
                  <CoeurIcon className="w-6 h-6 text-white" />
                ) : (
                  <MortIcon className="w-6 h-6 text-white" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Lives Count and Timer Section */}
        <div className="flex flex-col items-center md:flex-row md:space-x-4 mt-2 md:mt-0">
          <span className="font-bold text-white">
            {lives}/{extraLives.max}
          </span>
          {lives < 5 && (
            <span className="text-red-500 font-bold">
              {formatTime(timerValue)} remaining
            </span>
          )}
        </div>
      </div>

      {/* Progress Section */}
      <div className="flex items-center p-2 rounded-full shadow-md bg-duolingoDark2">
        <div className="relative w-40 h-6 mx-2 bg-gray-200 rounded-full">
          <div
            className="absolute left-0 h-full bg-green-500 rounded-full"
            style={{ width: `${energy}%` }} 
          />
          <span className="absolute inset-0 flex items-center justify-center text-white">
            {energy}%
          </span>
        </div>
      </div>

      {/* Coins Section */}
      <div className="flex items-center p-2 rounded-full shadow-md bg-duolingoDark2">
        <Piece className="w-6 h-6" />
        <span className="ml-2 font-bold text-white">{coins}</span>
      </div>
    </div>
  );
};

export default GameBar;
