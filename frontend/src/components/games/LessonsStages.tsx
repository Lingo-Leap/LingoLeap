import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ReactComponent as Closed } from "../../assets/icons/closed.svg";
import { useDecodeToken } from "../../hooks/useDecode";
import { containerStyles, typographyStyles } from "../../styles/styles";
import { Lesson } from "../../types/Game";

const StageSelection: React.FC<{ languageId: number }> = ({ languageId }) => {
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [progressData, setProgressData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  const decodedToken = useDecodeToken();
  const userId = decodedToken ? decodedToken.id : null;

  useEffect(() => {
    const fetchLessonsAndProgress = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Token manquant");
        return;
      }
      try {
        // Récupérer les leçons disponibles
        const lessonResponse = await axios.get(
          `http://localhost:1274/api/lessons/language/${languageId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const lessonsData = lessonResponse.data;
        setLessons(lessonsData);

        // Récupérer la progression de l'utilisateur
        const progressResponse = await axios.get(
          `http://localhost:1274/api/lessons/user/${userId}/language/${languageId}/progress`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const progressData = progressResponse.data;
        setProgressData(progressData); // Stocker les données de progression

        setLoading(false);
      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
        setLoading(false);
      }
    };

    if (userId) {
      fetchLessonsAndProgress();
    }
  }, [languageId, userId]);

  const handleStageClick = (stageId: number) => {
    navigate(`/language/${languageId}/stages/${stageId}/play`);
  };

  const getStageProgress = (lessonId: number) => {
    const stageProgress = progressData.find(
      (progress) => progress.lessonId === lessonId
    );
    if (!stageProgress) return { isCompleted: false, progress: 0 };
    return stageProgress;
  };

  const isStageUnlocked = (lessonId: number) => {
    const lessonIndex = lessons.findIndex((lesson) => lesson.id === lessonId);
    if (lessonIndex === 0) return true; // Le premier stage est toujours déverrouillé
    const previousLessonId = lessons[lessonIndex - 1]?.id;
    const previousLessonProgress = progressData.find(
      (progress) => progress.lessonId === previousLessonId
    );
    return previousLessonProgress && previousLessonProgress.isCompleted;
  };

  if (loading) {
    return (
      <div className="text-center text-duolingoLight">
        Chargement des stages...
      </div>
    );
  }

  return (
    <div className={`${containerStyles.fullWidthCenter} p-4`}>
      <div className={containerStyles.card}>
        <h1 className={`${typographyStyles.heading1} text-center`}>
          Sélectionnez un stage
        </h1>

        <div className="grid grid-cols-2 gap-8 mt-8 md:grid-cols-4">
          {lessons.map((lesson, index) => {
            const { isCompleted, progress } = getStageProgress(lesson.id);
            const isUnlocked = isStageUnlocked(lesson.id);

            return (
              <div
                key={lesson.id}
                className={`relative w-24 h-24 mx-auto rounded-full flex items-center justify-center ${
                  isUnlocked
                    ? "bg-duolingoGreen text-duolingoLight hover:bg-green-600 shadow-lg"
                    : "bg-duolingoGray text-duolingoDark"
                } transform transition-transform duration-200 ${
                  isUnlocked
                    ? "hover:scale-110 cursor-pointer"
                    : "opacity-70 hover:scale-105 cursor-not-allowed hover:opacity-50 "
                }`}
                onClick={() => isUnlocked && handleStageClick(lesson.id)}
              >
                {isCompleted ? (
                  <span className="text-2xl font-bold">✅</span> // Icône de stage complété
                ) : isUnlocked ? (
                  <span className="text-2xl font-bold">{index + 1}</span>
                ) : (
                  <Closed className="h-16 " />
                )}
                {progress > 0 && !isCompleted && (
                  <div className="absolute bottom-0 left-0 right-0 h-2 bg-gray-300">
                    <div
                      className="h-full bg-blue-500"
                      style={{ width: `${progress}%` }}
                    ></div>{" "}
                    {/* Barre de progression */}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default StageSelection;
