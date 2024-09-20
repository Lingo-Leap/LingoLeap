import axios from "axios";
import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState } from "react";
import { FaMedal, FaStar, FaTrophy } from "react-icons/fa";
import {
  achievementsStyles,
  buttonStyles,
  containerStyles,
  typographyStyles,
} from "../assets/styles";

interface DecodedToken {
  id: number;
  role: string;
  exp: number;
  iat: number;
}

interface LessonData {
  activeLessons: number;
  completedLessons: number;
}

const Achievements: React.FC = () => {
  const [decodedToken, setDecodedToken] = useState<DecodedToken | null>(null);
  const [lessonData, setLessonData] = useState<LessonData | null>(null);
  const [points, setPoints] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    if (token) {
      try {
        const decoded = jwtDecode<DecodedToken>(token);
        setDecodedToken(decoded);

        const lessonUrl = `http://localhost:1274/api/lessonsUsers/user/${decoded.id}/lessons/count`;
        const pointsUrl = `http://localhost:1274/api/user/points/${decoded.id}`;

        // Fetch lesson data
        axios
          .get(lessonUrl)
          .then((response) => {
            setLessonData(response.data);
          })
          .catch((error) => {
            console.error("Error fetching lesson data:", error);
          });

        // Fetch points
        axios
          .get(pointsUrl)
          .then((response) => {
            setPoints(response.data.totalPoints);
          })
          .catch((error) => {
            console.error("Error fetching points data:", error);
          })
          .finally(() => {
            setLoading(false);
          });
      } catch (err) {
        console.error("Error decoding token:", err);
        setLoading(false);
      }
    } else {
      console.log("No token found in localStorage");
      setLoading(false);
    }
  }, []);

  const calculateProgress = () => {
    if (lessonData) {
      const totalLessons =
        lessonData.activeLessons + lessonData.completedLessons;
      return totalLessons > 0
        ? Math.floor((lessonData.completedLessons / totalLessons) * 100)
        : 0;
    }
    return 0;
  };

  const isAchievementCompleted =
    lessonData?.activeLessons === lessonData?.completedLessons;

  if (loading) {
    return <p>Loading...</p>;
  }

  const renderLevel = () => {
    if (points! >= 1000)
      return <FaTrophy className={achievementsStyles.levelTrophy} />;
    if (points! >= 500)
      return <FaMedal className={achievementsStyles.levelMedal} />;
    return <FaStar className={achievementsStyles.levelStar} />;
  };

  return (
    <div className={containerStyles.fullScreenCenter + " mt-0"}>
      <div className={containerStyles.card}>
        <h2 className={typographyStyles.heading1}>Your Achievements</h2>

        <div className="flex flex-col gap-2 space-y-8 md:flex-row md:space-y-0 ">
          {/* Card: Progress */}
          <div className={containerStyles.achievementsCard}>
            <h3 className={typographyStyles.heading4}>Your Progress</h3>
            <div className={containerStyles.progressContainer}>
              <div className={achievementsStyles.progressCircle}>
                <div
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: `conic-gradient(#32CD32 ${calculateProgress()}%, #D3D3D3 0%)`,
                  }}
                ></div>
                <div className="absolute inset-0 flex items-center justify-center text-xl font-bold">
                  {calculateProgress()}%
                </div>
              </div>
            </div>
          </div>

          {/* Card: Lessons */}
          <div className={containerStyles.achievementsCard}>
            <h3 className={typographyStyles.heading4}>Lesson Data</h3>
            <div className="text-lg font-semibold text-center text-white md:mt-10">
              <p>Active Lessons: {lessonData?.activeLessons}</p>
              <p>Completed Lessons: {lessonData?.completedLessons}</p>
            </div>
            {isAchievementCompleted && (
              <p className="mt-4 text-lg font-semibold text-center text-green-500">
                All lessons completed!
              </p>
            )}
          </div>

          {/* Card: Points */}
          <div className={containerStyles.achievementsCard}>
            <h3 className={typographyStyles.heading4}>Your Points</h3>
            <div className="flex items-center justify-center mb-6 md:mt-10">
              {renderLevel()}
              <p className="ml-4 text-2xl font-bold text-yellow-300">
                {points} Points
              </p>
            </div>
          </div>
        </div>

        {/* Continue Button */}
        {!isAchievementCompleted && (
          <div className="flex justify-center mt-8">
            <button className={buttonStyles.primary}>
              Continue Your Progress
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Achievements;
