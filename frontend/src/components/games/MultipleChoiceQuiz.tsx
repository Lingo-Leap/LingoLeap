import axios from "axios"; // Pour faire la requête POST
import React, { useEffect, useState } from "react";
import { FiVolume2 } from "react-icons/fi";
import { useParams } from "react-router-dom"; // Pour obtenir la langue et le stage
import { useDecodeToken } from "../../hooks/useDecode"; // Hook personnalisé pour décoder le token JWT
import { useDispatch } from "react-redux";
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

const QuizExample: React.FC<QuizProps> = ({ questions }) => {
  const { language, stageId } = useParams(); // Récupérer la langue et le stage depuis l'URL
  const decodedToken = useDecodeToken();
  const userId = decodedToken ? decodedToken.id : null; // Récupérer l'id de l'utilisateur depuis le token

  const [selectedWord, setSelectedWord] = useState<string | null>(null); // Un seul mot sélectionné
  const [availableWords, setAvailableWords] = useState([...questions.options]); // Les mots disponibles
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null); // Statut de la réponse
  const [timeLeft, setTimeLeft] = useState(15); // Temps restant (en secondes)
  const [isTimeUp, setIsTimeUp] = useState(false); // Statut pour vérifier si le temps est écoulé
  const [incorrectCount, setIncorrectCount] = useState(0); // Compteur de mauvaises réponses
  const [showPopup, setShowPopup] = useState<string | null>(null); // Popup pour victoire ou défaite

  const dispatch = useDispatch();
  // Utiliser useEffect pour mettre en place le timer
  useEffect(() => {
    console.log(stageId);
    if (timeLeft > 0 && showPopup === null) {
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);

      return () => clearInterval(timer); // Nettoyage de l'intervalle lorsque le composant est démonté ou si le timer change
    } else if (timeLeft === 0) {
      setIsTimeUp(true); // Temps écoulé
      setShowPopup("lost");
      console.log("Temps écoulé, vous avez perdu !");
    }
  }, [timeLeft, showPopup]);

  const handleWordClick = (word: string) => {
    if (selectedWord === word) {
      return; // Si le même mot est cliqué, ne rien faire
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
    setAvailableWords([...questions.options]); // Réinitialiser les options
    setIsCorrect(null);
    setTimeLeft(15); // Réinitialiser le temps
    setIsTimeUp(false); // Réinitialiser l'état du timer
    setIncorrectCount(0); // Réinitialiser le compteur de mauvaises réponses
    setShowPopup(null); // Fermer le popup
  };

  const handleValidate = async () => {
    if (selectedWord === questions.answer) {
      setIsCorrect(true);
      setShowPopup("won");
      console.log("Bonne réponse, vous avez gagné !");
      dispatch(incrementEnergy(10));
      // Vérifier les données avant l'envoi
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
              lessonId: Number(stageId), // stage correspond au lessonId
              isActive: true,
              progress: 100, // Puisqu'il a gagné, le progrès est à 100%
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
      console.log("Réponse incorrecte");
    }
  };

  // Calculer la largeur de la barre de progression en fonction du temps restant
  const progressBarWidth = (timeLeft / 15) * 100; // 15 secondes au total

  return (
    <div className="flex flex-col items-center justify-center text-white">
      {/* Barre de progression */}
      <div className="w-full max-w-xl bg-gray-700 rounded-full h-2.5 my-4">
        <div
          className="bg-green-500 h-2.5 rounded-full"
          style={{ width: `${progressBarWidth}%` }}
        />
      </div>

      {/* Temps restant */}
      <div className="mb-4 text-lg">{timeLeft} secondes restantes</div>

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

        {/* Zone de réponse */}
        <div className="flex flex-col items-center">
          {/* Mot sélectionné */}
          <div className="w-full py-2 mb-6 text-center border-b-2 border-gray-500">
            {selectedWord ? selectedWord : "Cliquez sur un mot pour répondre"}
          </div>
        </div>

        {/* Liste de mots disponibles */}
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

        {/* Vérifier si le temps est écoulé */}
        {isTimeUp ? (
          <div className="mb-4 text-lg font-semibold text-red-500">
            Temps écoulé ! Vous avez perdu.
          </div>
        ) : (
          <>
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
                disabled={!selectedWord || isTimeUp || showPopup === "lost"} // Désactiver si le temps est écoulé ou perdu
              >
                Valider
              </button>
            </div>
          </>
        )}
      </div>

      {/* Popup affiché lors de la victoire ou de la défaite */}
      {showPopup === "won" && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-green-500">
              Félicitations !
            </h2>
            <p>Vous avez gagné !</p>
            <button
              className={`${buttonStyles.primary} mt-4`}
              onClick={handleReset}
            >
              Rejouer
            </button>
          </div>
        </div>
      )}

      {showPopup === "lost" && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-red-500">Désolé !</h2>
            <p>Vous avez perdu.</p>
            <button
              className={`${buttonStyles.primary} mt-4`}
              onClick={handleReset}
            >
              Rejouer
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizExample;
