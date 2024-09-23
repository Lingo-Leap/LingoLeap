import React, { useState } from "react";
import { FiVolume2 } from "react-icons/fi"; // Icone pour l'audio
import {
  buttonStyles,
  containerStyles,
  typographyStyles,
} from "../../styles/styles";

interface QuizProps {
  questions: {
    question: string;
    options: string[];
    answer: string;
  };
}

const QuizExample: React.FC<QuizProps> = ({ questions }) => {
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const [availableWords, setAvailableWords] = useState([...questions.options]);
  const [progress, setProgress] = useState(30); // Barre de progression, en pourcentage
  const [lives, setLives] = useState(5); // Coeurs de vie
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null); // Statut de la réponse

  const handleWordClick = (word: string) => {
    if (!selectedWords.includes(word)) {
      setSelectedWords([...selectedWords, word]);
      setAvailableWords(availableWords.filter((w) => w !== word));
    }
  };

  const handleReset = () => {
    setSelectedWords([]);
    setAvailableWords([...questions.options]);
    setIsCorrect(null);
  };

  const handleValidate = () => {
    const userAnswer = selectedWords.join(" ");
    if (userAnswer === questions.answer) {
      setIsCorrect(true);
      setProgress(progress + 10); // Augmenter la progression (exemple)
    } else {
      setIsCorrect(false);
      setLives(lives - 1); // Réduire les vies en cas d'erreur
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

      {/* Coeurs de vie */}
      <div className="flex justify-end w-full max-w-xl mb-4">
        <div className="text-2xl text-red-500">❤️ {lives}</div>
      </div>

      {/* Section Question */}
      <div className={`${containerStyles.card} flex flex-col items-center`}>
        <div className="flex items-center mb-4">
          <h2 className={`${typographyStyles.heading2} mr-4`}>
            {questions.question}
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

          {/* Mots sélectionnés */}
          <div className="w-full py-2 mb-6 text-center border-b-2 border-gray-500">
            {selectedWords.length > 0
              ? selectedWords.join(" ")
              : "Cliquez sur les mots pour former la réponse"}
          </div>
        </div>

        {/* Liste de mots disponibles */}
        <div className="flex flex-wrap gap-2 mb-6">
          {availableWords.map((word, index) => (
            <button
              key={index}
              className={`${buttonStyles.option} px-4 py-2`}
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
            disabled={selectedWords.length === 0}
          >
            Valider
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizExample;
