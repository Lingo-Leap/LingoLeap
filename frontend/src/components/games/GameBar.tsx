// ==============================
// Importing React and Redux Hooks
// ==============================
import React from "react";
import { useSelector } from "react-redux";

// ==============================
// Importing SVG Icons
// ==============================
import { ReactComponent as CoeurIcon } from "../../assets/icons/coeur.svg";
import { ReactComponent as Piece } from "../../assets/icons/euro.svg";
import { ReactComponent as MortIcon } from "../../assets/icons/toxique.svg";

// ==============================
// Importing Types
// ==============================
import { RootState } from "../../redux/store/store";

/**
 * Navbar Component
 *
 * Displays lives, energy, coins, and extra lives. Responsive for different screen sizes.
 */
const Navbar: React.FC = () => {
  // Fetching values from Redux store
  const lives = useSelector((state: RootState) => state.game.lives);
  const energy = useSelector((state: RootState) => state.game.energy);
  const coins = useSelector((state: RootState) => state.game.coins);
  const extraLives = useSelector((state: RootState) => state.game.extraLives);

  return (
    <div className="flex flex-col items-center justify-center px-4 py-4 md:flex-row md:space-x-4">
      {/* Lives Section */}
      <div className="flex items-center p-2 rounded-full shadow-md bg-duolingoDark2">
        {[...Array(5)].map((_, index) => (
          <div key={index} className="w-6 h-6">
            {index < lives ? (
              <CoeurIcon className="w-6 h-6" />
            ) : (
              <MortIcon className="w-6 h-6" />
            )}
          </div>
        ))}
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

      {/* Extra Lives Section */}
      <div className="flex items-center p-2 rounded-full shadow-md bg-duolingoDark2">
        <CoeurIcon className="w-6 h-6" />
        <span className="ml-2 font-bold text-white">
          {extraLives.current}/{extraLives.max}
        </span>
        <span className="ml-2 text-red-500">{extraLives.timer}</span>
      </div>
    </div>
  );
};

export default Navbar;
