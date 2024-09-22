import { useState } from "react";
import { FaMedal, FaStar, FaTrophy } from "react-icons/fa";
import {
  achievementsStyles,
  buttonStyles,
  containerStyles,
  typographyStyles,
} from "../assets/styles";

const quizData = [
  {
    question: "Quel est la capitale de la France?",
    options: ["Paris", "Londres", "Berlin", "Madrid"],
    answer: "Paris",
  },
  {
    question: "Quel est le plus grand océan?",
    options: ["Pacifique", "Atlantique", "Indien", "Arctique"],
    answer: "Pacifique",
  },
  {
    question: "Quel est le plus grand océan?",
    options: ["Pacifique", "Atlantique", "Indien", "Arctique"],
    answer: "Pacifique",
  },
];

const QuizAchievements = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);
  const [lives, setLives] = useState(3); // Système de vies
  const [points, setPoints] = useState<number>(0); // Points

  // Calcule la progression en pourcentage
  const calculateProgress = () => {
    return ((currentQuestion + 1) / quizData.length) * 100;
  };

  const handleAnswerSelection = (answer: any) => {
    setSelectedAnswer(answer);
    setShowConfirm(true); // Affiche la modale de confirmation
  };

  const handleNextQuestion = () => {
    if (selectedAnswer === quizData[currentQuestion].answer) {
      setScore(score + 1);
      setPoints(points + 100); // Ajoute des points pour chaque bonne réponse
    } else {
      setLives(lives - 1); // Perte d'une vie
    }

    setShowConfirm(false);

    // Continue if there are lives left and more questions to answer
    if (lives > 1 && currentQuestion < quizData.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handleConfirmAnswer = () => {
    handleNextQuestion();
  };

  const renderLevel = () => {
    if (points >= 1000)
      return <FaTrophy className={achievementsStyles.levelTrophy} />;
    if (points >= 500)
      return <FaMedal className={achievementsStyles.levelMedal} />;
    return <FaStar className={achievementsStyles.levelStar} />;
  };

  return (
    <div className={containerStyles.fullScreenCenter + " mt-0"}>
      <div className={containerStyles.card}>
        <h2 className={typographyStyles.heading1}>Quiz et Achievements</h2>

        {/* Afficher 'Game Over' si les vies sont 0 */}
        {lives === 0 ? (
          <div className="mt-8 text-center text-red-600">
            <h2 className={typographyStyles.heading1}>Game Over !</h2>
            <p>Vous avez perdu toutes vos vies.</p>
            <p>Score final: {score}</p>
          </div>
        ) : (
          <>
            {/* Barre de progression */}
            <div className="w-full h-4 mt-4 bg-gray-200 rounded-full">
              <div
                className="h-full bg-green-500 rounded-full"
                style={{ width: `${calculateProgress()}%` }}
              ></div>
            </div>
            <p className="mt-2 text-center text-gray-500">
              Progression: {Math.round(calculateProgress())}%
            </p>

            <div className="flex flex-col gap-2 space-y-8 md:flex-row md:space-y-0">
              {/* Carte de progression */}
              <div className={containerStyles.achievementsCard}>
                <h3 className={typographyStyles.heading4}>Votre progression</h3>
                <p>
                  Question {currentQuestion + 1} sur {quizData.length}
                </p>
                <p>Score: {score}</p>
              </div>

              {/* Carte des vies */}
              <div className={containerStyles.achievementsCard}>
                <h3 className={typographyStyles.heading4}>Vies restantes</h3>
                <p>{"❤️ ".repeat(lives)}</p>
              </div>

              {/* Carte des points */}
              <div className={containerStyles.achievementsCard}>
                <h3 className={typographyStyles.heading4}>Vos Points</h3>
                <div className="flex items-center justify-center mb-6 md:mt-10">
                  {renderLevel()}
                  <p className="ml-4 text-2xl font-bold text-yellow-300">
                    {points} Points
                  </p>
                </div>
              </div>
            </div>

            {/* Carte de la question */}
            <div className={containerStyles.achievementsCard}>
              <h3 className={typographyStyles.heading4}>
                {quizData[currentQuestion].question}
              </h3>
              <div className="flex flex-col gap-2">
                {quizData[currentQuestion].options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelection(option)}
                    className={buttonStyles.primary}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            {/* Modale de confirmation */}
            {showConfirm && (
              <>
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                  <div className="p-6 rounded-lg shadow-lg bg-dark">
                    <p className="mb-4 text-center">
                      Vous avez sélectionné : <strong>{selectedAnswer}</strong>.
                      Confirmez-vous votre choix ?
                    </p>
                    <div className="flex justify-center gap-4">
                      <button
                        onClick={handleConfirmAnswer}
                        className={buttonStyles.primary}
                      >
                        Confirmer
                      </button>
                      <button
                        onClick={() => setShowConfirm(false)}
                        className={buttonStyles.secondary}
                      >
                        Annuler
                      </button>
                    </div>
                  </div>
                </div>
                <div className="fixed inset-0 z-40 bg-black opacity-50"></div>
              </>
            )}

            {/* Message de fin de quiz */}
            {currentQuestion === quizData.length - 1 && (
              <div className="mt-8 text-center">
                <p>Quiz terminé ! Votre score final est de {score}.</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default QuizAchievements;
