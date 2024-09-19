import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { fetchUserProfile } from '../redux/actions/userActions';
import '../UserProfile.css';
const UserProfile = () => {
const dispatch = useDispatch();
  const userId = useSelector((state: RootState) => state.auth.userId);
  const userProfile = useSelector((state: RootState) => state.user.profile);
  const status = useSelector((state: RootState) => state.user.status);
  const error = useSelector((state: RootState) => state.user.error);

  useEffect(() => {
    if (userId) {
      console.log("Dispatching fetchUserProfile with userId:", userId);
      dispatch(fetchUserProfile(userId) as any);
    }
  }, [dispatch, userId]);

  useEffect(() => {
    if (userProfile) {
      console.log('Profile Picture URL:', userProfile.profilePicture);
    }
  
  }, [userProfile]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  if (!userProfile) {
    return <div>No profile data available.</div>;
  }

  return (
    <div className="user-profile">
      <div className="profile-picture">
        <img src={userProfile.profilePicture} alt="Profile" />
      </div>
      <div className="profile-info">
        <h2>{userProfile.username}</h2>
        <p>Email: {userProfile.email}</p>
        <p>Total Points: {userProfile.totalPoints || 0}</p>
      </div>
    </div>
  );
};

export default UserProfile;