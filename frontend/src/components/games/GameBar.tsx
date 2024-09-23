import React from "react"; 
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store/store";
import { ReactComponent as CoeurIcon } from "../../assets/icons/coeur.svg";
import { ReactComponent as Piece } from "../../assets/icons/euro.svg";
import { ReactComponent as MortIcon } from "../../assets/icons/toxique.svg";
import useTimer from "../../hooks/useTimer";

interface GameBarProps {
  timerValue: number; // Define prop type for the timer value
}

const GameBar: React.FC<GameBarProps> = ({ timerValue }) => {
  const lives = useSelector((state: RootState) => state.game.lives);
  const energy = useSelector((state: RootState) => state.game.energy);
  const coins = useSelector((state: RootState) => state.game.coins);
  const extraLives = useSelector((state: RootState) => state.game.extraLives);
  
  const { displayTimer } = useTimer(); // Use the timer hook

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
              {displayTimer} {/* Correctly render the displayTimer */}
            </span>
          )}
        </div>
      </div>

      {/* Energy Section */}
      <div className="flex items-center p-2 rounded-full shadow-md bg-duolingoDark2">
        <div className="relative w-40 h-6 mx-2 bg-gray-200 rounded-full">
          <div
            className="absolute left-0 h-full bg-blue-500 rounded-full"
            style={{ width: `${(energy / 10) * 100}%` }}
          />
          <span className="absolute inset-0 flex items-center justify-center text-white">
            {energy}/10
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
