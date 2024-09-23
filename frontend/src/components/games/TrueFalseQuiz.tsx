// ==============================
// Importing React and Hooks
// ==============================
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { TrueFalseQuizProps } from "../../types/Game";

/**
 * TrueFalseQuiz Component
 *
 * Handles true/false quiz questions with a timer and feedback.
 */
const TrueFalseQuiz: React.FC<TrueFalseQuizProps> = ({ questions }) => {
  const { languageId, stageId } = useParams();
  const navigate = useNavigate(); // Use navigate to go to the next question

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<boolean | null>(null);
  const [feedbackVisible, setFeedbackVisible] = useState(false);
  const [timeLeft, setTimeLeft] = useState(15);
  const [isTimeUp, setIsTimeUp] = useState(false);

  // Timer for each question
  useEffect(() => {
    if (timeLeft > 0 && !isTimeUp) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer); // Cleanup timer
    } else if (timeLeft === 0) {
      handleTimeout();
    }
  }, [timeLeft, isTimeUp]);

  // Handle time running out
  const handleTimeout = () => {
    setIsTimeUp(true);
    setSelectedAnswer(null);
    setFeedbackVisible(true);
  };

  // Handle user's answer selection
  const handleAnswer = (isTrue: boolean) => {
    setSelectedAnswer(isTrue);
    setFeedbackVisible(true); // Show feedback after answering
  };

  // Handle moving to the next question
  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setFeedbackVisible(false);
      setTimeLeft(15); // Reset timer
      setIsTimeUp(false); // Reset time up status
    } else {
      // Navigate to the next stage if this was the last question
      const nextStageId = Number(stageId) + 1;
      navigate(`/language/${languageId}/stages/${nextStageId}/play`);
    }
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

      <button onClick={handleNext} disabled={selectedAnswer === null}>
        Suivant
      </button>
    </div>
  );
};

export default TrueFalseQuiz;
