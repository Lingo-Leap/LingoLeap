import React from "react";
import LoginContainer from "../components/LoginContainer";
import { FaGlobe, FaLanguage, FaComments } from "react-icons/fa";

const HeroWelcome: React.FC = () => {
  return (
    <div className="relative flex flex-col items-center justify-center h-screen text-center bg-gray-900">
      {/* Slight Black Overlay for Text Readability */}
      <div className="absolute inset-0 bg-black opacity-50" />

      {/* Main Heading */}
      <h1 className="absolute z-20 text-6xl font-extrabold text-green-400 logoTitle top-24 drop-shadow-md">
        LINGOLEAP
      </h1>

      {/* Subheading */}
      <h2 className="z-20 mt-16 text-4xl font-semibold text-white md:text-5xl drop-shadow-lg">
        Unlock the World with Language
      </h2>

      {/* Subtitle */}
      <p className="z-20 mt-4 text-lg text-white">
        Join millions of learners and start your journey today!
      </p>

      {/* Login Container */}
      <div className="relative z-20 mt-12">
        <div className="w-full max-w-lg p-10 text-center text-white bg-gray-800 rounded-lg shadow-2xl">
          <LoginContainer />
        </div>
      </div>

      {/* Bottom Text */}
      <div className="absolute z-20 text-white bottom-5">
        <p className="text-lg font-semibold">
          Join over 1 million learners worldwide!
        </p>
      </div>
    </div>
  );
};

export default HeroWelcome;
