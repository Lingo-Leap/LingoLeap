import React, { useEffect, useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { ReactComponent as TrophyIcon } from "../assets/achivement.svg";
import { ReactComponent as Icon } from "../assets/icon.svg";
import { ReactComponent as HomeIcon } from "../assets/learn.svg";
import { ReactComponent as ProfileIcon } from "../assets/profile.svg";

interface NavbarProps {
  isAuthenticated: boolean;
  logout: () => void; // Add logout function to props
}

const Navbar: React.FC<NavbarProps> = ({ isAuthenticated, logout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrollingUp, setIsScrollingUp] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const location = useLocation();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  // Handle user logout
  const handleLogOut = () => {
    logout(); // Call logout from props
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY && window.scrollY > 50) {
        setIsScrollingUp(false);
      } else {
        setIsScrollingUp(true);
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const isActive = (path: string) => location.pathname === path;

  return (
    <div>
      {/* Mobile Logo Bar with Scroll Hide/Show Effect */}
      <div
        className={`fixed inset-x-0 top-0 z-50 bg-gray-900 p-4 md:hidden transition-transform duration-300 ease-in-out ${
          isScrollingUp ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="flex justify-center">
          <Icon className="w-10 h-10" />
          <h1 className="flex text-3xl font-bold text-green-400 logoTitle">
            LINGOLEAP
          </h1>
        </div>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden md:block">
        <div className="fixed z-50 flex items-center top-4 left-4">
          <button
            className="flex items-center p-2 text-white bg-gray-800 rounded-md focus:outline-none focus:ring"
            onClick={toggleSidebar}
          >
            {isOpen ? (
              <FaTimes className="w-6 h-6" />
            ) : (
              <FaBars className="w-6 h-6" />
            )}
          </button>
          {!isOpen && (
            <div className="flex items-center ml-4 transition-opacity duration-300 ease-in-out opacity-100">
              <Icon className="w-10 h-10 mr-2" />
              <h1 className="text-3xl font-bold text-green-400 logoTitle">
                LINGOLEAP
              </h1>
            </div>
          )}
        </div>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 z-40 flex flex-col h-screen p-6 shadow-xl bg-gradient-to-b from-gray-900 to-gray-800 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:w-1/5`}
      >
        <div className="flex justify-center mb-10 mt-14">
          <Icon className="w-10 h-10" />
          <h1 className="flex text-3xl font-bold text-green-400 logoTitle">
            LINGOLEAP
          </h1>
        </div>

        <ul className="flex flex-col space-y-8">
          <li className="flex items-center gap-4 group">
            <span className="p-3 transition-transform duration-300 bg-red-500 rounded-full shadow-lg group-hover:scale-110">
              <HomeIcon className="w-6 h-6" />
            </span>
            <Link
              to="/home"
              className={`text-xl font-medium ${
                isActive("/home")
                  ? "text-green-400"
                  : "text-gray-300 group-hover:text-green-400"
              } transition-colors duration-300`}
            >
              Learn
            </Link>
          </li>
          <li className="flex items-center gap-4 group">
            <span className="p-3 transition-transform duration-300 bg-yellow-500 rounded-full shadow-lg group-hover:scale-110">
              <TrophyIcon className="w-6 h-6" />
            </span>
            <Link
              to="/achievements"
              className={`text-xl font-medium ${
                isActive("/achievements")
                  ? "text-green-400"
                  : "text-gray-300 group-hover:text-green-400"
              } transition-colors duration-300`}
            >
              Achievements
            </Link>
          </li>
          <li className="flex items-center gap-4 group">
            <span className="p-3 transition-transform duration-300 bg-purple-500 rounded-full shadow-lg group-hover:scale-110">
              <ProfileIcon className="w-6 h-6" />
            </span>
            <Link
              to="/profile"
              className={`text-xl font-medium ${
                isActive("/profile")
                  ? "text-green-400"
                  : "text-gray-300 group-hover:text-green-400"
              } transition-colors duration-300`}
            >
              Profile
            </Link>
          </li>
        </ul>

        <div className="mt-auto">
          {isAuthenticated && (
            <button
              className="w-full py-3 text-xl font-bold text-white transition-transform duration-300 bg-red-500 rounded-lg shadow-lg hover:bg-red-600 hover:scale-105"
              onClick={handleLogOut}
            >
              LOGOUT
            </button>
          )}
        </div>
      </div>

      {/* Overlay to close sidebar when clicked outside */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black opacity-50"
          onClick={toggleSidebar}
        />
      )}

      {/* Mobile Bottom Navigation */}
      <div className="fixed inset-x-0 bottom-0 z-50 block bg-green-400 md:hidden">
        <div className="flex justify-around p-4">
          <Link
            to="/home"
            className="flex flex-col items-center transition-all duration-300 ease-in-out"
          >
            <HomeIcon className="w-6 h-6 mb-1" />
            <span
              className={`text-xs transition-all duration-300 ease-in-out ${
                isActive("/home")
                  ? "bg-white text-gray-800 rounded-full px-2 shadow-lg"
                  : "text-gray-800 hover:bg-white hover:rounded-full hover:shadow-md"
              }`}
            >
              Learn
            </span>
          </Link>
          <Link
            to="/achievements"
            className="flex flex-col items-center transition-all duration-300 ease-in-out"
          >
            <TrophyIcon className="w-6 h-6 mb-1" />
            <span
              className={`text-xs transition-all duration-300 ease-in-out ${
                isActive("/achievements")
                  ? "bg-white text-gray-800 rounded-full px-2 shadow-lg"
                  : "text-gray-800 hover:bg-white hover:rounded-full hover:shadow-md"
              }`}
            >
              Achievements
            </span>
          </Link>
          <Link
            to="/profile"
            className="flex flex-col items-center transition-all duration-300 ease-in-out"
          >
            <ProfileIcon className="w-6 h-6 mb-1" />
            <span
              className={`text-xs transition-all duration-300 ease-in-out ${
                isActive("/profile")
                  ? "bg-white text-gray-800 rounded-full px-2 shadow-lg"
                  : "text-gray-800 hover:bg-white hover:rounded-full hover:shadow-md"
              }`}
            >
              Profile
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
