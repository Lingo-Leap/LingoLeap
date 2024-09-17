import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

const Progress = () => {
//   const progress = useSelector((state: RootState) => state.user.progress);

  return (
    <div className="progress-container">
      <h2>Progress</h2>
      <div className="progress-bar">
        {/* <div className="progress" style={{ width: `${progress}%` }}></div> */}
      </div>
      {/* <p>{progress}% completed</p> */}
    </div>
  );
};

export default Progress;