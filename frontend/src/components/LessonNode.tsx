import React from 'react';
import { Link } from "react-router-dom";

const LessonNode: React.FC = () => {
  const handleClick = () => {
    console.log('Lesson started');
  };

  return (
<div className="flex flex-col items-center justify-center p-4">
  <Link to="/lesson">
    <div
      className="flex items-center justify-center w-24 h-24 bg-gradient-to-r from-green-400 to-blue-500 text-white rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition duration-300 cursor-pointer"
      onClick={handleClick}
    >
      <span className="text-center text-lg font-semibold">Lesson 1</span>
    </div>
  </Link>
  <p className="mt-2 text-gray-700 font-medium">Click to start your lesson!</p>
</div>
  );
};

export default LessonNode;
