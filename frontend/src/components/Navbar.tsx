import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

// function Navbar(){

// const navigate=useNavigate();


// return(
//     <div>
//         <Link to="/home"> Home </Link>
//         <Link to="/achievements"> Achievements </Link>
//         <Link to="/profile"> Profile </Link>

//     </div>
// )

// }

const Navbar: React.FC = () => {
    return (
      <div className="flex flex-col gap-4 fixed top-0 left-0 h-screen w-48 bg-white shadow-md p-4">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold">LINGOLEAP</h1>
        </div>
        <ul className="flex flex-col gap-4">
          <li className="flex items-center gap-2">
            <img src="" alt="Learn Icon" className="w-6 h-6" />
            <Link to="/home" className="text-lg font-medium"> Learn </Link>
          </li>
          <li className="flex items-center gap-2">
            <img src="" alt="Leaderboards Icon" className="w-6 h-6" />
            <Link to="/achievements" className="text-lg font-medium"> Achievements</Link>
          </li>
         
          <li className="flex items-center gap-2">
            <img src="" alt="Profile Icon" className="w-6 h-6" />
            <Link to="/profile" className="text-lg font-medium"> Profile</Link>
          </li>
        </ul>
      </div>
    );
  };

export default Navbar