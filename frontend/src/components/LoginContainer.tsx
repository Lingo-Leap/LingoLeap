import React from "react";
import { Link } from "react-router-dom";

const LoginContainer: React.FC = () => {
  return (
    <div className="flex items-center justify-center bg-gray-900">
      <div className="w-full max-w-lg p-10 text-center text-white bg-gray-800 rounded-lg shadow-2xl">
        <h2 className="mb-6 text-4xl font-bold">
          Create a profile to save your progress!
        </h2>

        <Link
          to="/register"
          className="block w-full py-3 mb-4 text-xl font-bold text-white transition-transform duration-300 bg-green-400 rounded-lg shadow-lg hover:bg-green-500 hover:scale-105"
        >
          CREATE A PROFILE
        </Link>

        <Link
          to="/login"
          className="block w-full py-3 text-xl font-bold text-white transition-transform duration-300 bg-blue-500 rounded-lg shadow-lg hover:bg-blue-600 hover:scale-105"
        >
          SIGN IN
        </Link>
      </div>
    </div>
  );
};

export default LoginContainer;
