import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { fetchUserProfile } from '../redux/actions/userActions';
import '../UserProfile.css';

const UserProfile = () => {
const dispatch = useDispatch();
  const userProfile = useSelector((state: RootState) => state.user.profile);
  const status = useSelector((state: RootState) => state.user.status);
  const error = useSelector((state: RootState) => state.user.error);

  useEffect(() => {
   
      console.log("Dispatching fetchUserProfile ");
      dispatch(fetchUserProfile() as any);
    
  }, [dispatch]);

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

  const profilePictureUrl = userProfile.profilePicture
  ? `http://localhost:1274/uploads/${userProfile.profilePicture}`
  : 'default-profile.png';

  return (
    <div className="user-profile">
      <div className="profile-picture">
        <img src={profilePictureUrl} alt="Profile" />
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