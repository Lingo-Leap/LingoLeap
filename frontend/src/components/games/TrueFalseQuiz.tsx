// ==============================
// Importing React and Hooks
// ==============================
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { TrueFalseQuizProps } from "../../types/Game";
import axios from "axios";
import { buttonStyles, containerStyles, typographyStyles } from "../../styles/styles"; // Imported styles

const TrueFalseQuiz: React.FC<TrueFalseQuizProps> = ({ questions }) => {
  const { languageId, stageId } = useParams();
  const navigate = useNavigate();

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<boolean | null>(null);
  const [feedbackVisible, setFeedbackVisible] = useState(false);
  const [timeLeft, setTimeLeft] = useState(15);
  const [isTimeUp, setIsTimeUp] = useState(false);
  const [showPopup, setShowPopup] = useState<string | null>(null);
  const [userId, setUserId] = useState<number | null>(null); // Store user ID if needed

  // Timer for each question
  useEffect(() => {
    if (timeLeft > 0 && !isTimeUp) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0) {
      handleTimeout();
    }
  }, [timeLeft, isTimeUp]);

  const handleTimeout = () => {
    setIsTimeUp(true);
    setSelectedAnswer(null);
    setFeedbackVisible(true);
    setShowPopup("lost");
  };

  const handleAnswer = (isTrue: boolean) => {
    setSelectedAnswer(isTrue);
    setFeedbackVisible(true);
    if (isTrue === questions[currentQuestion].isTrue) {
      setShowPopup("won");
      saveProgress();
    } else {
      setShowPopup("lost");
    }
  };

  const saveProgress = async () => {
    if (userId && stageId) {
      try {
        await axios.post(`http://localhost:1274/api/lessonsUsers/post`, {
          userId,
          lessonId: Number(stageId),
          isActive: true,
          progress: 100,
          isCompleted: true,
        });
      } catch (error) {
        console.error("Error saving progress: ", error);
      }
    }
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      resetQuizState();
    } else {
      handleNextStage();
    }
  };

  const resetQuizState = () => {
    setSelectedAnswer(null);
    setFeedbackVisible(false);
    setTimeLeft(15);
    setIsTimeUp(false);
    setShowPopup(null);
  };

  const handleNextStage = () => {
    const nextStageId = Number(stageId) + 1;
    navigate(`/language/${languageId}/stages/${nextStageId}/play`);
  };

  return (
    <div className="flex flex-col items-center justify-center text-white">
      <h3 className={typographyStyles.heading2}>{questions[currentQuestion].statement}</h3>
      <div className="flex gap-4 mb-6">
        <button className={buttonStyles.option} onClick={() => handleAnswer(true)}>
          Vrai
        </button>
        <button className={buttonStyles.option} onClick={() => handleAnswer(false)}>
          Faux
        </button>
      </div>

      {/* Timer Display */}
      <div className="mb-4 text-lg">{timeLeft} secondes restantes</div>

      {/* Display feedback */}
      {feedbackVisible && (
        <p className="mb-4">
          {selectedAnswer === questions[currentQuestion].isTrue ? "Correct!" : "Incorrect!"}
        </p>
      )}

      {isTimeUp && <p>Temps écoulé ! Vous avez perdu.</p>}

      {showPopup && (
        <div className={`popup ${showPopup === "won" ? "won" : "lost"} fixed inset-0 flex items-center justify-center bg-black bg-opacity-50`}>
          <div className="p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-green-500">{showPopup === "won" ? "Félicitations !" : "Désolé !"}</h2>
            <p>{showPopup === "won" ? "Vous avez gagné !" : "Vous avez perdu."}</p>
          </div>
        </div>
      )}

      <button
        className={`${buttonStyles.primary} mt-4`}
        onClick={handleNext}
        disabled={selectedAnswer === null && !isTimeUp}
      >
        Suivant
      </button>
    </div>
  );
};

export default TrueFalseQuiz;
