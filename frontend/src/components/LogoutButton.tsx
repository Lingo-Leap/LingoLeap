import React from "react";

const LogOutButton: React.FC<{ onClick: () => void }> = ({ onClick }) => {
  return (
    <button
      className="px-5 py-2 font-semibold text-white transition duration-300 transform bg-red-500 rounded-full shadow-md hover:bg-red-600 hover:scale-105"
      onClick={onClick}
    >
      Log Out
    </button>
  );
};

export default LogOutButton;
