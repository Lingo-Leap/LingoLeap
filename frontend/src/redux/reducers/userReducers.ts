import { createSlice } from '@reduxjs/toolkit';
import { fetchUserProfile, updateUserProfile,updateUserPassword} from '../actions/userActions';

export interface UserProfile {
  username: string;
  email: string;
  profilePicture: string;
  totalPoints: number;
  passwordHash: string;
  
}



interface UserState {
  profile: UserProfile | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  passwordHash: string | null;

}



const initialState: UserState = {
  profile: null,
  status: 'idle',
  error: null,
  passwordHash: null,
};



const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfile.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.profile = action.payload;
        state.error = null;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch user profile';
      })
      .addCase(updateUserProfile.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.profile = { ...state.profile, ...action.payload };
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to update user profile';
      })
      .addCase(updateUserPassword.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateUserPassword.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.passwordHash = action.payload;
        state.error = null; 
      })
      .addCase(updateUserPassword.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to update user password';
      });
  },
});

  
export default userSlice.reducer;