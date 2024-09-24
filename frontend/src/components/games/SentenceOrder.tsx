import axios from "axios";
import React, { useEffect, useState } from "react";
import { FiVolume2 } from "react-icons/fi";
import { useNavigate, useParams } from "react-router-dom";
import { useDecodeToken } from "../../hooks/useDecode";
import {
  buttonStyles,
  containerStyles,
  typographyStyles,
} from "../../styles/styles";
import { SentenceOrderProps } from "../../types/Game";

// Utility function to shuffle an array
const shuffleArray = (array: string[]) => {
  return array
    .map((word) => ({ word, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ word }) => word);
};

const SentenceOrderQuiz: React.FC<SentenceOrderProps> = ({
  sentence,
  scrambled,
  language,
}) => {
  // Retrieve stage and language IDs from URL params
  const { stageId, languageId } = useParams();
  const navigate = useNavigate();
  const decodedToken = useDecodeToken();
  const userId = decodedToken ? decodedToken.id : null;

  // State management
  const [sentenceOrder, setSentenceOrder] = useState<string[]>([]);
  const [availableWords, setAvailableWords] = useState<string[]>([]);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [timeLeft, setTimeLeft] = useState(15);
  const [isTimeUp, setIsTimeUp] = useState(false);
  const [showPopup, setShowPopup] = useState<string | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null); // URL for the audio file

  // Shuffle words on component mount
  useEffect(() => {
    setAvailableWords(shuffleArray(scrambled));
  }, [scrambled]);

  // Timer effect
  useEffect(() => {
    if (timeLeft > 0 && !showPopup) {
      const timer = setInterval(
        () => setTimeLeft((prevTime) => prevTime - 1),
        1000
      );
      return () => clearInterval(timer);
    } else if (timeLeft === 0) {
      setIsTimeUp(true);
      setShowPopup("lost");
    }
  }, [timeLeft, showPopup]);

  // Handle word selection and sentence formation
  const handleWordSelection = (word: string) => {
    if (!sentenceOrder.includes(word)) {
      setSentenceOrder([...sentenceOrder, word]);
      setAvailableWords(availableWords.filter((w) => w !== word));
    }
  };

  // Submit the formed sentence for validation
  const handleSubmit = async () => {
    const correctOrder = sentence.split(" ");
    const isCorrectSentence =
      sentenceOrder.join(" ") === correctOrder.join(" ");
    setIsCorrect(isCorrectSentence);

    if (isCorrectSentence) {
      setShowPopup("won");

      // Send progress data to the backend
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
        } catch (error) {
          console.error("Error posting data: ", error);
        }
      }
    } else {
      setShowPopup("lost");
    }
  };

  // Handle Text-to-Speech API call
  const handleTextToSpeech = async () => {
    try {
      const response = await axios.post(
        "http://localhost:1274/api/sound/text-to-speech",
        {
          text: sentence, // Use the sentence for text-to-speech
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

  // Reset the quiz state
  const handleReset = () => {
    setSentenceOrder([]);
    setAvailableWords(shuffleArray(scrambled)); // Shuffle the words again on reset
    setIsCorrect(null);
    setTimeLeft(15);
    setIsTimeUp(false);
    setShowPopup(null);
  };

  // Navigate to the next stage
  const handleNextStage = () => {
    const nextStageId = Number(stageId) + 1;
    navigate(`/language/${languageId}/stages/${nextStageId}/play`);
  };

  const handleBack = () => {
    navigate(-1);
  };

  // Progress bar width
  const progressBarWidth = (timeLeft / 15) * 100;

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
            Reorganize the sentence:
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
            {sentenceOrder.length > 0
              ? sentenceOrder.join(" ")
              : "Click on a word to form a sentence"}
          </div>
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
            onClick={handleBack}
          >
            Back
          </button>
          <button
            className={`${buttonStyles.primary} px-6 py-2`}
            onClick={handleSubmit}
            disabled={sentenceOrder.length !== scrambled.length || isTimeUp}
          >
            Validate
          </button>
        </div>
      </div>

      {showPopup === "won" && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-green-500">
              Congratulations!
            </h2>
            <p>You correctly reorganized the sentence!</p>
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
            <p>You lost. Try again!</p>
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

export default SentenceOrderQuiz;
