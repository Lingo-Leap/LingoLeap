import React from 'react';

const LogOutButton: React.FC<{ onClick: () => void }> = ({ onClick }) => {
  return (
    <button
      className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-5 rounded-full shadow-md transition duration-300 transform hover:scale-105"
      onClick={onClick}
    >
      Log Out
    </button>
  );
};

export default LogOutButton;
