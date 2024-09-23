// ==============================
// Importing React and Hooks
// ==============================
import React, { useEffect, useState } from "react";
// Importing the separated type
import { TrueFalseQuizProps } from "../../types/Game";

/**
 * TrueFalseQuiz Component
 *
 * Handles true/false quiz questions with a timer and feedback.
 */
const TrueFalseQuiz: React.FC<TrueFalseQuizProps> = ({ questions }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<boolean | null>(null);
  const [feedbackVisible, setFeedbackVisible] = useState(false);
  const [timeLeft, setTimeLeft] = useState(15);

  // Timer for each question
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
      if (timeLeft === 0) handleTimeout();
    }, 1000);

    return () => clearInterval(timer); // Cleanup timer
  }, [timeLeft]);

  // Handle time running out
  const handleTimeout = () => {
    setSelectedAnswer(null);
    setFeedbackVisible(true);
  };

  // Handle user's answer selection
  const handleAnswer = (isTrue: boolean) => {
    const isCorrect = isTrue === questions[currentQuestion].isTrue;
    setSelectedAnswer(isTrue);
    setFeedbackVisible(true); // Show feedback after answering
  };

  return (
    <>
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
    </>
  );
};

export default TrueFalseQuiz;
