import React from 'react';
import { Link } from "react-router-dom";

const LoginContainer: React.FC = () => {
  return (
    <div className="flex flex-col gap-6 mt-8 bg-white bg-opacity-80 p-6 border border-transparent rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-center text-green-600">Create a profile to save your progress!</h1>
      <Link to="/register" className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-5 rounded-full transition duration-200 shadow-md hover:shadow-lg">
        CREATE A PROFILE
      </Link>
      <Link to="/login" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-5 rounded-full transition duration-200 shadow-md hover:shadow-lg">
        SIGN IN
      </Link>
      
    </div>
  );
}


export default LoginContainer;
