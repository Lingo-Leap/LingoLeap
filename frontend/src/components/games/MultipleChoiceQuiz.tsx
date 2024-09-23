import axios from "axios"; // For making POST requests
import { useDispatch, useSelector } from "react-redux"; 
import { decrementLives, setExtraLives } from "../../redux/actions/gameActions";
import React, { useEffect, useState } from "react";
import { FiVolume2 } from "react-icons/fi";
import { useParams } from "react-router-dom"; // To get the language and stage
import { useDecodeToken } from "../../hooks/useDecode"; // Custom hook to decode JWT token
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
  const dispatch = useDispatch();
  const { language, stageId } = useParams(); // Get the language and stage from the URL
  const decodedToken = useDecodeToken();
  const userId = decodedToken ? decodedToken.id : null; // Get the user ID from the token
  const [selectedWord, setSelectedWord] = useState<string | null>(null); // Single selected word
  const [availableWords, setAvailableWords] = useState([...questions.options]); // Available words
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null); // Answer status
  const [timeLeft, setTimeLeft] = useState(15); // Remaining time (in seconds)
  const [isTimeUp, setIsTimeUp] = useState(false); // Status to check if time is up
  const [incorrectCount, setIncorrectCount] = useState(0); // Incorrect answers counter
  const [showPopup, setShowPopup] = useState<string | null>(null); // Popup for win or lose
  const [hasLivesDecremented, setHasLivesDecremented] = useState(false); // Track if lives have been decremented

  // Use useEffect to set up the timer
  useEffect(() => {
    if (timeLeft > 0 && showPopup === null) {
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);

      return () => clearInterval(timer); // Clean up the interval on component unmount or if timer changes
    } else if (timeLeft === 0 && !hasLivesDecremented) {
      setIsTimeUp(true); // Time's up
      dispatch(decrementLives()); // Decrement lives
      setHasLivesDecremented(true); // Mark that we've decremented lives
      setShowPopup("lost");
      console.log("Temps écoulé, vous avez perdu !");
    }
  }, [timeLeft, showPopup, hasLivesDecremented, dispatch]);

  const handleWordClick = (word: string) => {
    if (selectedWord === word) {
      return; // If the same word is clicked, do nothing
    } else if (selectedWord) {
      const updatedWords = availableWords.map((w) =>
        w === word ? selectedWord : w
      );
      setSelectedWord(word);
      setAvailableWords(updatedWords);
    } else {
      setSelectedWord(word);
      setAvailableWords(availableWords.filter((w) => w !== word));
    }
  };

  const handleReset = () => {
    setSelectedWord(null);
    setAvailableWords([...questions.options]); // Reset options
    setIsCorrect(null);
    setTimeLeft(15); // Reset time
    setIsTimeUp(false); // Reset timer state
    setIncorrectCount(0); // Reset incorrect answers
    setShowPopup(null); // Close popup
    setHasLivesDecremented(false); // Reset lives decrement tracking
  };

  const handleValidate = async () => {
    if (selectedWord === questions.answer) {
      setIsCorrect(true);
      setShowPopup("won");
      console.log("Bonne réponse, vous avez gagné !");

      // Check data before sending
      console.log("Données envoyées :", {
        userId,
        lessonId: Number(stageId),
        isActive: true,
        progress: 100,
        isCompleted: true,
      });

      if (userId && stageId) {
        try {
          const response = await axios.post(
            `http://localhost:1274/api/lessonsUsers/post`,
            {
              userId: userId,
              lessonId: Number(stageId), // stage corresponds to lessonId
              isActive: true,
              progress: 100, // Since they won, progress is 100%
              isCompleted: true,
            }
          );
          console.log("Données postées avec succès : ", response.data);
        } catch (error: any) {
          console.error("Erreur lors de la requête : ", error);
        }
      }
    } else {
      setIsCorrect(false);
      setIncorrectCount(incorrectCount + 1);
      dispatch(decrementLives());
      console.log("Réponse incorrecte");
    }
  };

  // Calculate the width of the progress bar based on the remaining time
  const progressBarWidth = (timeLeft / 15) * 100; // 15 seconds total

  return (
    <div className="flex flex-col items-center justify-center text-white">
      {/* Progress Bar */}
      <div className="w-full max-w-xl bg-gray-700 rounded-full h-2.5 my-4">
        <div
          className="bg-green-500 h-2.5 rounded-full"
          style={{ width: `${progressBarWidth}%` }}
        />
      </div>

      {/* Remaining Time */}
      <div className="mb-4 text-lg">{timeLeft} seconds left</div>

      {/* Question Section */}
      <div className={`${containerStyles.card} flex flex-col items-center`}>
        <div className="flex items-center mb-4">
          <h2 className={`${typographyStyles.heading2} mr-4`}>
            {questions.question}
          </h2>
          <button className="p-2 rounded-full text-duolingoBlue">
            <FiVolume2 className="text-2xl" />
          </button>
        </div>

        {/* Response Area */}
        <div className="flex flex-col items-center">
          {/* Selected Word */}
          <div className="w-full py-2 mb-6 text-center border-b-2 border-gray-500">
            {selectedWord ? selectedWord : "Click on a word to respond..."}
          </div>
        </div>

        {/* List of Available Words */}
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

        {/* Check if time is up */}
        {isTimeUp ? (
          <div className="mb-4 text-lg font-semibold text-red-500">
            Time over. You've lost.
          </div>
        ) : (
          <>
            {/* Feedback Message */}
            {isCorrect !== null && (
              <div
                className={`text-lg font-semibold mb-4 ${
                  isCorrect ? "text-green-500" : "text-red-500"
                }`}
              >
                {isCorrect ? "Correct!" : "Incorrect, try again."}
              </div>
            )}

            {/* Validate and Skip Buttons */}
            <div className="flex justify-between w-full mt-6">
              <button
                className={`${buttonStyles.secondary} px-6 py-2`}
                onClick={handleReset}
              >
                Skip
              </button>
              <button
                className={`${buttonStyles.primary} px-6 py-2`}
                onClick={handleValidate}
                disabled={!selectedWord || isTimeUp || showPopup === "lost"} // Disable if time is up or lost
              >
                Check
              </button>
            </div>
          </>
        )}
      </div>

      {/* Popup displayed on win or loss */}
      {showPopup === "won" && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-green-500">
              Congratulations !
            </h2>
            <p>You passed!</p>
            <button
              className={`${buttonStyles.primary} mt-4`}
              onClick={handleReset}
            >
              Restart
            </button>
          </div>
        </div>
      )}

      {showPopup === "lost" && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-red-500">You lost! Try again!</h2>
            <p>You've lost.</p>
            <button
              className={`${buttonStyles.primary} mt-4`}
              onClick={handleReset}
            >
              Restart
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizExample;
