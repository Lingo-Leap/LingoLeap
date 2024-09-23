import axios from "axios"; // Pour faire la requête POST
import React, { useEffect, useState } from "react";
import { FiVolume2 } from "react-icons/fi"; // Icone pour le son (optionnelle)
import { useParams } from "react-router-dom"; // Pour obtenir le stage et l'id depuis l'URL
import { useDecodeToken } from "../../hooks/useDecode"; // Hook personnalisé pour décoder le token JWT
import {
  buttonStyles,
  containerStyles,
  typographyStyles,
} from "../../styles/styles"; // Styles importés
import { SentenceOrderProps } from "../../types/Game"; // Importer le type SentenceOrderProps

/**
 * SentenceOrderQuiz Component
 *
 * Manages the sentence ordering quiz where the user has to rearrange words to form a correct sentence.
 */
const SentenceOrderQuiz: React.FC<SentenceOrderProps> = ({
  sentence,
  scrambled,
  language,
}) => {
  const { stageId } = useParams(); // Récupérer l'id du stage depuis l'URL
  const decodedToken = useDecodeToken();
  const userId = decodedToken ? decodedToken.id : null; // Récupérer l'id de l'utilisateur depuis le token

  const [sentenceOrder, setSentenceOrder] = useState<string[]>([]); // L'ordre des mots sélectionnés par l'utilisateur
  const [availableWords, setAvailableWords] = useState<string[]>(scrambled); // Mots disponibles à sélectionner
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null); // Pour gérer si la réponse est correcte
  const [timeLeft, setTimeLeft] = useState(15); // Temps restant (en secondes)
  const [isTimeUp, setIsTimeUp] = useState(false); // Statut si le temps est écoulé
  const [showPopup, setShowPopup] = useState<string | null>(null); // Popup pour victoire ou défaite

  // Utiliser useEffect pour mettre en place le timer
  useEffect(() => {
    if (timeLeft > 0 && showPopup === null) {
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);

      return () => clearInterval(timer); // Nettoyage de l'intervalle lorsque le composant est démonté ou si le timer change
    } else if (timeLeft === 0) {
      setIsTimeUp(true); // Temps écoulé
      setShowPopup("lost");
    }
  }, [timeLeft, showPopup]);

  // Handle word selection to form the sentence
  const handleWordSelection = (word: string) => {
    if (!sentenceOrder.includes(word)) {
      setSentenceOrder([...sentenceOrder, word]);
      setAvailableWords(availableWords.filter((w) => w !== word)); // Retirer le mot sélectionné des mots disponibles
    }
  };

  // Handle sentence submission
  const handleSubmit = async () => {
    const correctOrder = sentence.split(" "); // Convertir la phrase correcte en tableau
    const isCorrectSentence =
      sentenceOrder.join(" ") === correctOrder.join(" ");
    setIsCorrect(isCorrectSentence);

    if (isCorrectSentence) {
      setShowPopup("won");
      if (userId && stageId) {
        try {
          const response = await axios.post(
            `http://localhost:1274/api/lessonsUsers/post`,
            {
              userId: userId,
              lessonId: Number(stageId),
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
      setShowPopup("lost");
    }
  };

  // Réinitialiser le quiz
  const handleReset = () => {
    setSentenceOrder([]); // Réinitialiser l'ordre des mots sélectionnés
    setAvailableWords(scrambled); // Réinitialiser les mots disponibles
    setIsCorrect(null); // Réinitialiser le statut de la réponse
    setTimeLeft(15); // Réinitialiser le temps
    setIsTimeUp(false); // Réinitialiser l'état du timer
    setShowPopup(null); // Fermer le popup
  };

  // Calculer la largeur de la barre de progression en fonction du temps restant
  const progressBarWidth = (timeLeft / 15) * 100;

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
            Réorganisez la phrase :
          </h2>
          <button className="p-2 rounded-full text-duolingoBlue">
            <FiVolume2 className="text-2xl" />
          </button>
        </div>

        {/* Zone de réponse */}
        <div className="flex flex-col items-center">
          <div className="w-full py-2 mb-6 text-center border-b-2 border-gray-500">
            {sentenceOrder.length > 0
              ? sentenceOrder.join(" ")
              : "Cliquez sur un mot pour former une phrase"}
          </div>
        </div>

        {/* Liste de mots disponibles */}
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
            onClick={handleSubmit}
            disabled={sentenceOrder.length !== scrambled.length || isTimeUp}
          >
            Valider
          </button>
        </div>
      </div>

      {/* Popup de victoire ou de défaite */}
      {showPopup === "won" && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-green-500">
              Félicitations !
            </h2>
            <p>Vous avez réorganisé correctement la phrase !</p>
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
            <p>Vous avez perdu. Essayez encore !</p>
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

export default SentenceOrderQuiz;
