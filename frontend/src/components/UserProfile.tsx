import React, { useEffect, useState, useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import '@fortawesome/fontawesome-free/css/all.min.css';
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

const UserProfile: React.FC = () => {
  const dispatch = useDispatch();
  const { profile: userProfile, status, error } = useSelector((state: RootState) => state.user);

  // Fetch the userId from localStorage 
  const userId = useMemo(() => localStorage.getItem("userId"), []);


  const [formState, setFormState] = useState({
    username: "",
    email: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const { username, email, currentPassword, newPassword, confirmPassword } = formState;

  useEffect(() => {
    if (!userProfile) {
      dispatch(fetchUserProfile() as any);
    }
  }, [dispatch, userProfile]);

  useEffect(() => {
    if (userProfile) {
      setFormState((prev) => ({
        ...prev,
        username: userProfile.username,
        email: userProfile.email,
      }));
    }
  }, [userProfile]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { id, value } = e.target;
      setFormState((prev) => ({
        ...prev,
        [id]: value,
      }));
    },
    []
  );

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(updateUserProfile({ username, email } as any) as any);
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    dispatch(updateUserPassword({ currentPassword, newPassword } as any) as any);
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
                onChange={handleChange}
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
                onChange={handleChange}
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
                onChange={handleChange}
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
                onChange={handleChange}
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
                onChange={handleChange}
                className={formStyles.input}
                autoComplete="new-password"
              />
            </div>
            <button type="submit" className={buttonStyles.secondary}>
              Update Password
            </button>

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