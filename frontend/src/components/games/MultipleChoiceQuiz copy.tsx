import React, { useState } from "react";
import { FiVolume2 } from "react-icons/fi"; // Icône pour l'audio
import {
  buttonStyles,
  containerStyles,
  typographyStyles,
} from "../../styles/styles";

interface QuizProps {
  questionData: {
    question: string;
    options: string[];
    answer: string;
  };
}

const QuizExample: React.FC<QuizProps> = ({ questionData }) => {
  const [selectedWord, setSelectedWord] = useState<string | null>(null); // Un seul mot sélectionné
  const [availableWords, setAvailableWords] = useState([
    ...questionData.options,
  ]);
  const [progress, setProgress] = useState(30); // Barre de progression, en pourcentage
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null); // Statut de la réponse

  const handleWordClick = (word: string) => {
    if (selectedWord === word) {
      // Si le mot est déjà sélectionné, on le désélectionne
      setSelectedWord(null);
      setAvailableWords([...availableWords, word].sort()); // Remettre le mot dans les options
    } else {
      // Sélectionner un nouveau mot, remplacer l'ancien
      setSelectedWord(word);
      setAvailableWords(availableWords.filter((w) => w !== word));
    }
  };

  const handleReset = () => {
    setSelectedWord(null);
    setAvailableWords([...questionData.options]);
    setIsCorrect(null);
  };

  const handleValidate = () => {
    if (selectedWord === questionData.answer) {
      setIsCorrect(true);
      setProgress(progress + 10); // Augmenter la progression (exemple)
    } else {
      setIsCorrect(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-white bg-gray-900">
      {/* Barre de progression */}
      <div className="w-full max-w-xl bg-gray-700 rounded-full h-2.5 my-4">
        <div
          className="bg-green-500 h-2.5 rounded-full"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Section Question */}
      <div className={`${containerStyles.card} flex flex-col items-center`}>
        <div className="flex items-center mb-4">
          <h2 className={`${typographyStyles.heading2} mr-4`}>
            {questionData.question}
          </h2>
          <button className="p-2 rounded-full text-duolingoBlue">
            <FiVolume2 className="text-2xl" />
          </button>
        </div>

        {/* Image et zone de réponse */}
        <div className="flex flex-col items-center">
          {/* Avatar ou icône */}
          <div className="mb-4">
            <img
              src="https://via.placeholder.com/100"
              alt="avatar"
              className="w-24 h-24 rounded-full"
            />
          </div>

          {/* Mot sélectionné */}
          <div className="w-full py-2 mb-6 text-center border-b-2 border-gray-500">
            {selectedWord ? selectedWord : "Cliquez sur un mot pour répondre"}
          </div>
        </div>

        {/* Liste de mots disponibles */}
        <div className="flex flex-wrap gap-2 mb-6">
          {availableWords.map((word, index) => (
            <button
              key={index}
              className={`${buttonStyles.option} px-4 py-2 ${
                selectedWord === word ? "bg-green-500" : ""
              }`}
              onClick={() => handleWordClick(word)}
            >
              {word}
            </button>
          ))}
        </div>

        {/* Message de feedback */}
        {isCorrect !== null && (
          <div
            className={`text-lg font-semibold mb-4 ${
              isCorrect ? "text-green-500" : "text-red-500"
            }`}
          >
            {isCorrect ? "Correct!" : "Incorrect, réessayez."}
          </div>
        )}

        {/* Boutons Valider et Passer */}
        <div className="flex justify-between w-full mt-6">
          <button
            className={`${buttonStyles.secondary} px-6 py-2`}
            onClick={handleReset}
          >
            Passer
          </button>
          <button
            className={`${buttonStyles.primary} px-6 py-2`}
            onClick={handleValidate}
            disabled={!selectedWord}
          >
            Valider
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizExample;
