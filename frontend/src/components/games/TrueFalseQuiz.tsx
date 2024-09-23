// ==============================
// Importing React and Hooks
// ==============================
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { TrueFalseQuizProps } from "../../types/Game";
import axios from "axios";

/**
 * TrueFalseQuiz Component
 *
 * Handles true/false quiz questions with a timer and feedback.
 */
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

  // Handle time running out
  const handleTimeout = () => {
    setIsTimeUp(true);
    setSelectedAnswer(null);
    setFeedbackVisible(true);
    setShowPopup("lost");
  };

  // Handle user's answer selection
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

  // Handle saving user progress
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

  // Handle moving to the next question or stage
  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setFeedbackVisible(false);
      setTimeLeft(15);
      setIsTimeUp(false);
      setShowPopup(null);
    } else {
      handleNextStage();
    }
  };

  // Handle navigating to the next stage
  const handleNextStage = () => {
    const nextStageId = Number(stageId) + 1;
    navigate(`/language/${languageId}/stages/${nextStageId}/play`);
  };

  return (
    <div>
      <h3>{questions[currentQuestion].statement}</h3>
      <button onClick={() => handleAnswer(true)}>Vrai</button>
      <button onClick={() => handleAnswer(false)}>Faux</button>

      {/* Display feedback */}
      {feedbackVisible && (
        <p>
          {selectedAnswer === questions[currentQuestion].isTrue
            ? "Correct!"
            : "Incorrect!"}
        </p>
      )}

      {isTimeUp && <p>Temps écoulé ! Vous avez perdu.</p>}

      {showPopup && (
        <div className={`popup ${showPopup === "won" ? "won" : "lost"}`}>
          <h2>{showPopup === "won" ? "Félicitations !" : "Désolé !"}</h2>
          <p>{showPopup === "won" ? "Vous avez gagné !" : "Vous avez perdu."}</p>
        </div>
      )}

      {/* Always show the "Suivant" button, but disable it if necessary */}
      <button onClick={handleNext} disabled={selectedAnswer === null && !isTimeUp}>
        Suivant
      </button>
    </div>
  );
};

export default TrueFalseQuiz;
