import React, { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode"; // Ensure this import is correct
import { FaTrophy } from "react-icons/fa"; // Champion icon

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

  return (
    <div style={{ fontFamily: "Baloo 2, sans-serif", textAlign: "center" }}>
      <div style={{ marginTop: "20px" }}>
        <h2>Your Scorecard</h2>
        {lessonData ? (
          <div
            style={{
              width: "200px",
              height: "200px",
              borderRadius: "50%",
              border: `10px solid ${
                isAchievementCompleted ? "#FFD700" : "#FF4500"
              }`,
              position: "relative",
              margin: "auto",
            }}
          >
            <div
              style={{
                width: "100%",
                height: "100%",
                background: `conic-gradient(#32CD32 ${calculateProgress()}%, #D3D3D3 0%)`,
                borderRadius: "50%",
              }}
            />
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                fontSize: "24px",
                color: "#FFF",
              }}
            >
              {calculateProgress()}%
            </div>
          </div>
        ) : (
          <p>No lesson data available</p>
        )}
        {isAchievementCompleted && (
          <p style={{ color: "#FFD700", marginTop: "10px" }}>
            All lessons completed!
          </p>
        )}

        {/* Display total points with a champion icon */}
        {points !== null && (
          <div
            style={{
              marginTop: "20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <FaTrophy style={{ color: "#FFD700", fontSize: "40px" }} />
            <p
              style={{
                marginLeft: "10px",
                fontSize: "24px",
                fontWeight: "bold",
                color: "#FFD700",
              }}
            >
              {points} Points
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Achievements;
