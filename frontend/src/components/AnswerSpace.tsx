import React from 'react';

const AnswerSpace: React.FC<{ selectedWords: string[], onWordReturn: (word: string) => void }> = ({ selectedWords, onWordReturn }) => {
  return (
    <div className="flex flex-col items-center mt-4">
      <div className="bg-gray-200 rounded-md h-12 w-full max-w-md flex items-center justify-center text-gray-600">
        {selectedWords.length > 0 ? (
          selectedWords.map((word, index) => (
            <div
              key={index}
              className="bg-blue-200 text-gray-800 rounded-md p-2 mb-1 cursor-pointer"
              onClick={() => onWordReturn(word)} // Return word on click
            >
              {word}
            </div>
          ))
        ) : (
          <p>Select your words above</p>
        )}
      </div>
    </div>
  );
};

export default AnswerSpace;
