import axios from "axios"; // For making the POST request
import React, { useEffect, useState } from "react";
import { FiVolume2 } from "react-icons/fi"; // Icon for sound (optional)
import { decrementLives
 } from "../../redux/actions/gameActions";

 import { useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom"; // To get the stage and ID from the URL
import { useDecodeToken } from "../../hooks/useDecode"; // Custom hook to decode JWT token
import {
  buttonStyles,
  containerStyles,
  typographyStyles,
} from "../../styles/styles"; // Imported styles
import { SentenceOrderProps } from "../../types/Game"; // Importing SentenceOrderProps type

const SentenceOrderQuiz: React.FC<SentenceOrderProps> = ({
  sentence,
  scrambled,
  language,
}) => {
  const [incorrectCount, setIncorrectCount] = useState(0); // Compteur de mauvaises réponses

  const { stageId, languageId } = useParams(); // Get the stage ID from the URL
  const navigate = useNavigate(); // Use navigate to go to the next stage
  const decodedToken = useDecodeToken();
  const userId = decodedToken ? decodedToken.id : null; // Get the user ID from the token
  const dispatch = useDispatch(); // Use dispatch to
  const [sentenceOrder, setSentenceOrder] = useState<string[]>([]);
  const [availableWords, setAvailableWords] = useState<string[]>(scrambled);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [timeLeft, setTimeLeft] = useState(15);
  const [isTimeUp, setIsTimeUp] = useState(false);
  const [showPopup, setShowPopup] = useState<string | null>(null);

  useEffect(() => {
    if (timeLeft > 0 && showPopup === null) {
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(timer); // Clear the timer if we're about to go to zero
            setIsTimeUp(true);
            setShowPopup("lost");
            dispatch(decrementLives()); // Decrement lives
            return 0; // Set timeLeft to zero
          }
          return prevTime - 1; // Decrease time left
        });
      }, 1000);
      
      return () => clearInterval(timer); // Clear the interval on component unmount or when timeLeft changes
    }
  }, [timeLeft, showPopup, dispatch]);

  const handleWordSelection = (word: string) => {
    if (!sentenceOrder.includes(word)) {
      setSentenceOrder([...sentenceOrder, word]);
      setAvailableWords(availableWords.filter((w) => w !== word));
    }
  };

  const handleSubmit = async () => {
    const correctOrder = sentence.split(" ");
    const isCorrectSentence = sentenceOrder.join(" ") === correctOrder.join(" ");
    setIsCorrect(isCorrectSentence);

    if (isCorrectSentence) {
      setShowPopup("won");
      if (userId && stageId) {
        try {
          const response = await axios.post(
            `http://localhost:1274/api/lessonsUsers/post`,
            {
              userId,
              lessonId: Number(stageId),
              isActive: true,
              progress: 100,
              isCompleted: true,
            }
          );
          console.log("Data posted successfully: ", response.data);
        } catch (error: any) {
          console.error("Error during the request: ", error);
        }
      }
    } else {
      setIsCorrect(false);
      setIncorrectCount(incorrectCount + 1); // Incrémenter le compteur de mauvaises réponses
      dispatch(decrementLives()); // Décrémenter les vies
      setShowPopup("lost"); // Afficher le popup de défaite
      console.log("Réponse incorrecte");
    }
  };

  const handleReset = () => {
    setSentenceOrder([]);
    setAvailableWords(scrambled);
    setIsCorrect(null);
    setTimeLeft(15);
    setIsTimeUp(false);
    setShowPopup(null);
  };

  const handleNextStage = () => {
    const nextStageId = Number(stageId) + 1;
    navigate(`/language/${languageId}/stages/${nextStageId}/play`);
  };

  const progressBarWidth = (timeLeft / 15) * 100;

  return (
    <div className="flex flex-col items-center justify-center text-white">
      <div className="w-full max-w-xl bg-gray-700 rounded-full h-2.5 my-4">
        <div
          className="bg-green-500 h-2.5 rounded-full"
          style={{ width: `${progressBarWidth}%` }}
        />
      </div>

      <div className="mb-4 text-lg">{timeLeft} seconds remaining.</div>

      <div className={`${containerStyles.card} flex flex-col items-center`}>
        <div className="flex items-center mb-4">
          <h2 className={`${typographyStyles.heading2} mr-4`}>
            Reorganize the phrase:
          </h2>
          <button className="p-2 rounded-full text-duolingoBlue">
            <FiVolume2 className="text-2xl" />
          </button>
        </div>

        <div className="flex flex-col items-center">
          <div className="w-full py-2 mb-6 text-center border-b-2 border-gray-500">
            {sentenceOrder.length > 0
              ? sentenceOrder.join(" ")
              : "Form a sentence..."}
          </div>

          {/* Message de feedback */}
          {isCorrect !== null && (
            <div
              className={`text-lg font-semibold mb-4 ${
                isCorrect ? "text-green-500" : "text-red-500"
              }`}
            >
              {isCorrect ? "Correct!" : "Incorrect, try again."}
            </div>
          )}
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {availableWords.map((word, index) => (
            <button
              key={index}
              className={`${buttonStyles.option} px-4 py-2`}
              onClick={() => handleWordSelection(word)}
            >
              {word}
            </button>
          ))}
        </div>

        <div className="flex justify-between w-full mt-6">
          <button
            className={`${buttonStyles.secondary} px-6 py-2`}
            onClick={handleReset}
          >
            Skip
          </button>
          <button
            className={`${buttonStyles.primary} px-6 py-2`}
            onClick={handleSubmit}
            disabled={sentenceOrder.length !== scrambled.length || isTimeUp}
          >
            Check
          </button>
        </div>
      </div>

      {showPopup === "won" && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-green-500">Congratulations !</h2>
            <p>You have reorganized the phrase correctly !</p>
            <button
              className={`${buttonStyles.primary} mt-4`}
              onClick={handleNextStage}
            >
              Next Level
            </button>
          </div>
        </div>
      )}

      {showPopup === "lost" && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-red-500">Sorry! You lost!</h2>
            <p>You lost! Try again!</p>
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

export default SentenceOrderQuiz;
