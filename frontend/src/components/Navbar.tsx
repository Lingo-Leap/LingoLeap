import React from "react";
import { Link } from "react-router-dom";
import LogOutButton from "./LogoutButton";

const Navbar: React.FC = () => {
  const handleLogOut = () => {
    console.log('User logged out');
  };

  return (
    <div className="flex flex-col gap-4 fixed top-0 left-0 h-screen w-48 bg-white shadow-md p-4">
      <div className="flex items-center gap-2">
        <h1 className="text-2xl font-bold">LINGOLEAP</h1>
      </div>
      <ul className="flex flex-col gap-4">
        <li className="flex items-center gap-2">
          <Link to="/home" className="text-lg font-medium">Learn</Link>
        </li>
        <li className="flex items-center gap-2">
          <Link to="/achievements" className="text-lg font-medium">Achievements</Link>
        </li>
        <li className="flex items-center gap-2">
          <Link to="/profile" className="text-lg font-medium">Profile</Link>
        </li>
      </ul>
      <div className="flex justify-center items-center h-screen">
        <Link to ="/"><LogOutButton onClick={handleLogOut} /></Link>
      </div>
    </div>
  );
};

export default Navbar;
