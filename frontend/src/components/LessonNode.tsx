import React from 'react';

const LessonNode: React.FC = () => {
  const handleClick = () => {
    console.log('Lesson started');
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div
        className="flex items-center justify-center w-20 h-20 bg-green-500 text-white rounded-full shadow-lg hover:bg-green-600 transition duration-300 cursor-pointer"
        onClick={handleClick} // Move onClick to this div
      >
        <span className="text-center text-sm font-semibold">Lesson 1</span>
      </div>
    </div>
  );
};

export default LessonNode;
