import axios from "axios";
import React, { useEffect, useState } from "react";
import { FiVolume2 } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useDecodeToken } from "../../hooks/useDecode";
import { incrementEnergy } from "../../redux/actions/gameActions";
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

const MultipleChoiceQuiz: React.FC<QuizProps> = ({ questions }) => {
  const { languageId, stageId } = useParams();
  const navigate = useNavigate();
  const decodedToken = useDecodeToken();
  const userId = decodedToken ? decodedToken.id : null;
  const [selectedWord, setSelectedWord] = useState<string | null>(null);
  const [availableWords, setAvailableWords] = useState([...questions.options]);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [timeLeft, setTimeLeft] = useState(15);
  const [isTimeUp, setIsTimeUp] = useState(false);
  const [incorrectCount, setIncorrectCount] = useState(0);
  const [showPopup, setShowPopup] = useState<string | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null); // URL for the audio file

  const dispatch = useDispatch();

  // Timer setup
  useEffect(() => {
    if (timeLeft > 0 && showPopup === null) {
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0) {
      setIsTimeUp(true);
      setShowPopup("lost");
    }
  }, [timeLeft, showPopup]);

  const handleWordClick = (word: string) => {
    if (selectedWord === word) return;
    setSelectedWord(word);
    if (!selectedWord) {
      setAvailableWords(availableWords.filter((w) => w !== word));
    } else {
      setAvailableWords(
        availableWords.map((w) => (w === word ? selectedWord : w))
      );
      setSelectedWord(word);
    }
  };

  const handleReset = () => {
    setSelectedWord(null);
    setAvailableWords([...questions.options]);
    setIsCorrect(null);
    setTimeLeft(15);
    setIsTimeUp(false);
    setIncorrectCount(0);
    setShowPopup(null);
  };

  const handleValidate = async () => {
    if (selectedWord === questions.answer) {
      setIsCorrect(true);
      setShowPopup("won");
      dispatch(incrementEnergy(10));
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
          console.log("Data successfully posted: ", response.data);
        } catch (error: any) {
          console.error("Error posting data: ", error);
        }
      }
    } else {
      setIsCorrect(false);
      setIncorrectCount(incorrectCount + 1);
    }
  };

  const handleTextToSpeech = async () => {
    try {
      const response = await axios.post(
        "http://localhost:1274/api/sound/text-to-speech",
        {
          text: questions.question,
        }
      );

      const { url } = response.data;
      setAudioUrl(url);

      // Automatically play the audio
      const audio = new Audio(url);
      audio.play();
    } catch (error: any) {
      console.error("Error fetching text-to-speech audio:", error);
    }
  };

  const progressBarWidth = (timeLeft / 15) * 100;

  const handleNextStage = () => {
    const nextStageId = Number(stageId) + 1;
    navigate(`/language/${languageId}/stages/${nextStageId}/play`);
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="flex flex-col items-center justify-center text-white">
      <div className="w-full max-w-xl bg-gray-700 rounded-full h-2.5 my-4">
        <div
          className="bg-green-500 h-2.5 rounded-full"
          style={{ width: `${progressBarWidth}%` }}
        />
      </div>

      <div className="mb-4 text-lg">{timeLeft} seconds remaining</div>

      <div className={`${containerStyles.card} flex flex-col items-center`}>
        <div className="flex items-center mb-4">
          <h2 className={`${typographyStyles.heading2} mr-4`}>
            {questions.question}
          </h2>
          <button
            className="p-2 rounded-full text-duolingoBlue"
            onClick={handleTextToSpeech}
          >
            <FiVolume2 className="text-2xl" />
          </button>
        </div>

        <div className="flex flex-col items-center">
          <div className="w-full py-2 mb-6 text-center border-b-2 border-gray-500">
            {selectedWord ? selectedWord : "Click on a word to answer"}
          </div>
        </div>

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

        {isTimeUp ? (
          <div className="mb-4 text-lg font-semibold text-red-500">
            Time's up! You lost.
          </div>
        ) : (
          <>
            {isCorrect !== null && (
              <div
                className={`text-lg font-semibold mb-4 ${
                  isCorrect ? "text-green-500" : "text-red-500"
                }`}
              >
                {isCorrect ? "Correct!" : "Incorrect, try again."}
              </div>
            )}

            <div className="flex justify-between w-full mt-6">
              <button
                className={`${buttonStyles.secondary} px-6 py-2`}
                onClick={handleBack}
              >
                Back
              </button>
              <button
                className={`${buttonStyles.primary} px-6 py-2`}
                onClick={handleValidate}
                disabled={!selectedWord || isTimeUp || showPopup === "lost"}
              >
                Validate
              </button>
            </div>
          </>
        )}
      </div>

      {showPopup === "won" && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-green-500">
              Congratulations!
            </h2>
            <p>You won!</p>
            <button
              className={`${buttonStyles.primary} mt-4`}
              onClick={handleNextStage}
            >
              Next Stage
            </button>
          </div>
        </div>
      )}

      {showPopup === "lost" && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-red-500">Sorry!</h2>
            <p>You lost.</p>
            <button
              className={`${buttonStyles.primary} mt-4`}
              onClick={handleReset}
            >
              Retry
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MultipleChoiceQuiz;
