import React from 'react';

const Progress: React.FC = () => {
  // Static progress data
  const completedLessons = 7; // Example completed lessons
  const totalLessons = 10; // Example total lessons
  const totalPoints = 150; // Example total points

  // Calculate progress percentage
  const progressPercentage = Math.min((completedLessons / totalLessons) * 100, 100);

  return (
    <div className="bg-gray-300 rounded-full h-4 mb-2  bg-gray-100 rounded-lg shadow-lg max-w-md mx-auto">
    <div
      className="bg-green-500 h-full rounded-full"
      style={{ width: `${progressPercentage}%` }}
    ></div>
  </div>
    );
  };
    // <div className="p-6 bg-gray-100 rounded-lg shadow-lg max-w-md mx-auto">
      {/* <h1 className="text-2xl font-bold mb-4">Progress</h1>
      <p className="mb-2">Completed Lessons: {completedLessons} / {totalLessons}</p>
      <p className="mb-4">Total Points: {totalPoints}</p> */}

     
      {/* <p className="text-center">{progressPercentage.toFixed(0)}% Completed</p> */}
    {/* </div> */}


export default Progress;
