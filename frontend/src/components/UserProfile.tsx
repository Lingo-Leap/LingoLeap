import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUserProfile,
  updateUserProfile,
} from "../redux/actions/userActions";
import { RootState } from "../store/store";
import {
  containerStyles,
  buttonStyles,
  profileStyles,
  formStyles,
} from "../assets/styles"; // Import des styles

const UserProfile = () => {
  const dispatch = useDispatch();
  const userProfile = useSelector((state: RootState) => state.user.profile);
  const status = useSelector((state: RootState) => state.user.status);
  const error = useSelector((state: RootState) => state.user.error);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedData = {
      username,
      email,
      currentPassword,
      newPassword,
      confirmPassword,
    };
    dispatch(updateUserProfile(updatedData as any) as any);
  };

  const handleLogOut = () => {
    console.log("User logged out");
    // Add logic for logout (e.g., clearing user session, navigating to login page)
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
    <div className={containerStyles.fullScreenCenter}>
      {/* Profile Card */}
      <div className={containerStyles.card}>
        {/* Profile Picture and Username */}
        <div className="flex items-center justify-center mb-6">
          <div className={profileStyles.pictureContainer}>
            <img
              src={profilePictureUrl}
              alt="Profile"
              className={profileStyles.picture}
            />
          </div>
          <h2 className={profileStyles.username}>{userProfile.username}</h2>
        </div>

        {/* Form for Profile Update */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Section: Profile Information */}
          <div className="space-y-4">
            <h3 className={profileStyles.sectionTitle}>Profile Information</h3>
            <div className={containerStyles.formGroup}>
              <div className="form-group md:w-1/2">
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

              <div className="form-group md:w-1/2">
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
            </div>
          </div>

          {/* Section: Total Points */}
          <div className="pt-6 space-y-4">
            <h3 className={profileStyles.sectionTitle}>Achievements</h3>
            <div className="p-4 bg-gray-700 rounded-lg shadow-lg form-group">
              <label
                htmlFor="totalPoints"
                className="block text-xl font-bold text-yellow-400"
              >
                Total Points
              </label>
              <p
                id="totalPoints"
                className="block mt-2 text-3xl font-bold text-yellow-300"
              >
                {userProfile.totalPoints || 0}
              </p>
            </div>
          </div>

          {/* Section: Password Update */}
          <div className="pt-6 space-y-4">
            <h3 className={profileStyles.sectionTitle}>Password Settings</h3>
            <div className={containerStyles.formGroup}>
              <div className="form-group md:w-1/2">
                <label htmlFor="currentPassword" className={formStyles.label}>
                  Current Password
                </label>
                <input
                  type="password"
                  id="currentPassword"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className={formStyles.input}
                />
              </div>

              <div className="form-group md:w-1/2">
                <label htmlFor="password" className={formStyles.label}>
                  New Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className={formStyles.input}
                />
              </div>
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
              />
            </div>
          </div>

          {/* Submit Button */}
          <button type="submit" className={buttonStyles.primary}>
            Update Profile
          </button>

          {/* Mobile-Only Logout Button */}
          <button onClick={handleLogOut} className={buttonStyles.logout}>
            Logout
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserProfile;
