import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUserProfile,
  updateUserProfile,
} from "../redux/actions/userActions";
import { RootState } from "../store/store";
import "../UserProfile.css";

const UserProfile = () => {
  const dispatch = useDispatch();
  const userProfile = useSelector((state: RootState) => state.user.profile);
  const status = useSelector((state: RootState) => state.user.status);
  const error = useSelector((state: RootState) => state.user.error);

  const userId = useState(localStorage.getItem("userId"));
  console.log(userId, "=============userId================");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    console.log("Dispatching fetchUserProfile ");
    dispatch(fetchUserProfile() as any);
  }, [dispatch]);

  useEffect(() => {
    if (userProfile) {
      console.log("Profile Picture URL:", userProfile.profilePicture);
      setUsername(userProfile.username);
      setEmail(userProfile.email);
    }
  }, [userProfile]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedData = { username , email, currentPassword, newPassword, confirmPassword };
    dispatch(updateUserProfile(updatedData as any) as any); // Dispatch the update action
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedData = {
      username,
      email,
      currentPassword,
      newPassword,
      confirmPassword,
    };
    dispatch(updateUserProfile(updatedData as any) as any); // Dispatch the update action
  };

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <div>Error: {error}</div>;
  }

  if (!userProfile) {
    return <div>No profile data available.</div>;
  }

  const profilePictureUrl = userProfile.profilePicture
    ? `http://localhost:1274/uploads/${userProfile.profilePicture}`
    : "default-profile.png";
    ? `http://localhost:1274/uploads/${userProfile.profilePicture}`
    : 'default-profile.png';

  return (
    <div className="user-profile">
      <div className="profile-picture">
        <img src={profilePictureUrl} alt="Profile" />
      </div>
      <div className="profile-info">
        <h2>{userProfile.username}</h2>
        <form className="update-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          {/* Displaying total points as read-only */}
          <div className="form-group">
            <label htmlFor="totalPoints">Total Points</label>
            <p id="totalPoints">{userProfile.totalPoints || 0}</p>
          </div>
          {/* New Password Input */}
          <div className="form-group">
            <label htmlFor="currentPassword">Current Password</label>
            <input
              type="password"
              id="currentPassword"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">New Password</label>
            <input
              type="password"
              id="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          {/* Confirm Password Input */}
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="update-btn">
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserProfile;
