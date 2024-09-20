import { jwtDecode } from "jwt-decode"; // Import jwt-decode
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  login,
  logout,
  signup,
  updateUserProfile,
} from "../store/features/authSlice";
import { AppDispatch, RootState } from "../store/store";

// Define the structure of your decoded token (adjust based on your token structure)
interface DecodedToken {
  userId: string;
  role: string;
  exp: number;
}

export function useAuth() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  // Select authentication state from Redux store
  const { token, userId, loading, error } = useSelector(
    (state: RootState) => state.auth
  );

  // Check if the user is authenticated based on token presence
  const isAuthenticated = Boolean(token);

  // Initialize isAdmin as false
  let isAdmin = false;

  // Decode the token to get the user's role (if token exists)
  if (token) {
    const decoded: DecodedToken = jwtDecode(token);
    isAdmin = decoded.role === "admin"; // Check if the role is admin
  }

  // Helper functions for login, signup, logout
  const loginUser = async (email: string, password: string) => {
    await dispatch(login({ email, passwordHash: password })).unwrap();
    if (token) {
      navigate("/home");
    }
  };

  const registerUser = async (formData: FormData) => {
    await dispatch(signup(formData)).unwrap();
    if (token) {
      navigate("/home");
    }
  };

  const logoutUser = () => {
    dispatch(logout());
    navigate("/login");
  };

  const updateProfile = async (updatedData: {
    userId: string;
    username: string;
    email: string;
    currentPassword?: string;
    newPassword?: string;
    confirmPassword?: string;
  }) => {
    await dispatch(updateUserProfile(updatedData)).unwrap();
    // Optionally navigate or perform other actions after profile update
  };

  return {
    isAuthenticated,
    isAdmin, // Return isAdmin
    loading,
    error,
    loginUser,
    registerUser,
    logoutUser,
    updateProfile,
  };
}
