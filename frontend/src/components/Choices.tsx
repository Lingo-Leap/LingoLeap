import React, { useState } from 'react';
import AnswerSpace from './AnswerSpace';

const Choices: React.FC = () => {
  const questionType: 'multiple' = 'multiple'; // Set to 'multiple'

  // Original ordering words
  const originalOrderingWords = [
    "the",
    "capital",
    "of",
    "France",
    "is",
    "Paris",
  ];

  // Shuffle function
  const shuffleArray = (array: string[]) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  // Shuffle the words for display
  const [orderingWords, setOrderingWords] = useState(shuffleArray([...originalOrderingWords]));
  const [selectedWords, setSelectedWords] = useState<string[]>([]);

  const handleWordClick = (word: string) => {
    if (!selectedWords.includes(word)) {
      setSelectedWords((prev) => [...prev, word]);
      setOrderingWords((prev) => prev.filter(w => w !== word)); // Remove from choices
    }
  };

  const handleWordReturn = (word: string) => {
    setSelectedWords((prev) => prev.filter(w => w !== word)); // Remove from selected
    setOrderingWords((prev) => [...prev, word]); // Add back to choices
  };

  // Placeholder function for handling multiple choice clicks
  const handleOptionClick = (option: string) => {
    console.log(`Selected option: ${option}`);
    // Handle your option selection logic here
  };

  // Declare options above the return statement
  const options = ["Option A", "Option B", "Option C", "Option D"];

  return (
    <div className="flex flex-col items-center mt-8">
      <AnswerSpace selectedWords={selectedWords} onWordReturn={handleWordReturn} />

      {/* Render Ordering Words */}
      {/* {questionType === 'ordering' && (
        <div className="flex flex-wrap justify-center space-x-2 mt-4">
          {orderingWords.map((word, index) => (
            <div
              key={index}
              className="bg-white text-gray-800 rounded-md shadow-md p-3 hover:bg-gray-100 transition duration-200 cursor-pointer"
              onClick={() => handleWordClick(word)}
            >
              {word}
            </div>
          ))}
        </div>
      )} */}

      {/* Render Multiple Choice Options */}
      {questionType === 'multiple' && (
        <div className="flex flex-col space-y-2 mt-4">
          {options.map((option, index) => (
            <div
              key={index}
              className="bg-white text-gray-800 font-medium rounded-md shadow-md p-3 hover:bg-gray-100 transition duration-200 cursor-pointer"
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Choices;
