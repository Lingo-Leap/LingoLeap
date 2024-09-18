import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

const Progress: React.FC = () => {
  // const progress = useSelector((state: RootState) => state.user.progress);
  // const totalPoints = useSelector((state: RootState) => state.user.totalPoints);

  return (
    <div>
      <h1>Progress</h1>
      {/* <p>Completed Lessons: {progress.completedLessons}</p> */}
      {/* <p>Progress Percentage: {progress.percentage}%</p> */}
      {/* <p>Total Points: {totalPoints}</p> */}
    </div>
  );
};

export default Progress;