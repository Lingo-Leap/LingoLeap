import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  buttonStyles,
  containerStyles,
  formStyles,
  profileStyles,
  spacingStyles,
} from "../assets/styles";
import {
  fetchUserProfile,
  updateUserPassword,
  updateUserProfile,
} from "../redux/actions/userActions";
import { RootState } from "../store/store";

const UserProfile = () => {
  const dispatch = useDispatch();
  const userProfile = useSelector((state: RootState) => state.user.profile);
  const status = useSelector((state: RootState) => state.user.status);
  const error = useSelector((state: RootState) => state.user.error);

  // Fetch the userId from localStorage
  const userId = localStorage.getItem("userId");
  console.log(userId, "=============userId================");

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    dispatch(fetchUserProfile() as any);
  }, [dispatch]);

  useEffect(() => {
    if (userProfile) {
      setUsername(userProfile.username);
      setEmail(userProfile.email);
    }
  }, [userProfile]);

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedData = { username, email };
    dispatch(updateUserProfile(updatedData as any) as any);
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    const updatedData = { currentPassword, newPassword };
    dispatch(updateUserPassword(updatedData as any) as any);
  };

  const handleLogOut = () => {
    // Log out logic here
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

  return (
    <div className={containerStyles.fullWidthCenter}>
      <div className={containerStyles.card}>
        <div className={profileStyles.pictureContainer}>
          <img
            src={profilePictureUrl}
            alt="Profile"
            className={profileStyles.picture}
          />
        </div>
        <div className={spacingStyles.marginAuto}>
          <h2 className={profileStyles.username}>{userProfile.username}</h2>
          <form className="update-form" onSubmit={handleProfileSubmit}>
            <div className="form-group">
              <label htmlFor="username" className={formStyles.label}>
                Username
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className={formStyles.input}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email" className={formStyles.label}>
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={formStyles.input}
              />
            </div>
            <button type="submit" className={buttonStyles.primary}>
              Update Profile
            </button>
          </form>

          <form className="update-form" onSubmit={handlePasswordSubmit}>
            <div className="form-group">
              <label htmlFor="currentPassword" className={formStyles.label}>
                Current Password
              </label>
              <input
                type="password"
                id="currentPassword"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className={formStyles.input}
                autoComplete="current-password"
              />
            </div>
            <div className="form-group">
              <label htmlFor="newPassword" className={formStyles.label}>
                New Password
              </label>
              <input
                type="password"
                id="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className={formStyles.input}
                autoComplete="new-password"
              />
            </div>
            <div className="form-group">
              <label htmlFor="confirmPassword" className={formStyles.label}>
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={formStyles.input}
                autoComplete="new-password"
              />
            </div>
            <button type="submit" className={buttonStyles.secondary}>
              Update Password
            </button>

            {/* Mobile-Only Logout Button */}
            <button onClick={handleLogOut} className={buttonStyles.logout}>
              Logout
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
