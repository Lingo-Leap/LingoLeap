import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { fetchUserProfile } from '../redux/actions/userActions';
import '../UserProfile.css';
const UserProfile = () => {
  const dispatch = useDispatch();
  const userId = 8; 
  const userProfile = useSelector((state: RootState) => state.user.profile);

  useEffect(() => {
    dispatch(fetchUserProfile(userId) as any);
  }, [dispatch, userId]);

  useEffect(() => {
    if (userProfile) {
      console.log('Profile Picture URL:', userProfile.profilePicture);
    }
  
  }, [userProfile]);

  if (!userProfile) {
    return <div>Loading...</div>;
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