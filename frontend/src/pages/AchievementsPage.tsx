import axios from "axios";
import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState } from "react";
import { FaMedal, FaStar, FaTrophy } from "react-icons/fa"; // Icônes supplémentaires
import "./Achievements.css"; // Pour les animations et le style

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
  const [points, setPoints] = useState<number | null>(null); // New state for points
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
            setPoints(response.data.totalPoints); // Assuming the response format
          })
          .catch((error) => {
            console.error("Error fetching points data:", error);
          })
          .finally(() => {
            setLoading(false); // Stop loading when all data is fetched
          });
      } catch (err) {
        console.error("Error decoding token:", err);
        setLoading(false);
      }
    } else {
      console.log("No token found in localStorage");
      setLoading(false); // Stop loading if no token
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
    if (points! >= 1000) return <FaTrophy style={{ color: "#FFD700" }} />;
    if (points! >= 500) return <FaMedal style={{ color: "#C0C0C0" }} />;
    return <FaStar style={{ color: "#CD7F32" }} />;
  };

  return (
    <div className="achievement-container">
      <h2>Your Achievements</h2>
      {lessonData ? (
        <>
          <h3>Your Progress</h3>
          <div className="achievement-card">
            <div className="progress-circle">
              <div
                className="progress-bar"
                style={{
                  background: `conic-gradient(#32CD32 ${calculateProgress()}%, #D3D3D3 0%)`,
                }}
              />
              <div className="progress-text">{calculateProgress()}%</div>
            </div>
          </div>
        </>
      ) : (
        <p>No lesson data available</p>
      )}
      {isAchievementCompleted && (
        <p className="completed-text">All lessons completed!</p>
      )}

      {/* Display total points with a champion icon */}

      {points !== null && (
        <>
          {" "}
          <h3>Your Points</h3>
          <div className="points-container">
            {renderLevel()}
            <p className="points-text">{points} Points</p>
          </div>
        </>
      )}

      {/* Bouton pour continuer la progression */}
      {!isAchievementCompleted && (
        <button className="continue-button">Continue Your Progress</button>
      )}
    </div>
  );
};

export default Achievements;
