import React from 'react';

const Questions: React.FC = () => {
  return (
    <div className="flex justify-center mt-8">
      <div className="relative bg-yellow-300 text-gray-800 font-bold rounded-lg shadow-lg max-w-md w-full p-6">
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-3 w-0 h-0 border-l-8 border-r-8 border-b-8 border-transparent border-b-yellow-300"></div>
        <p className="text-xl">QUESTION HERE</p>
      </div>
    </div>
  );
};

export default Questions;
