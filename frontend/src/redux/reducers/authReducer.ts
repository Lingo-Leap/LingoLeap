// ==============================
// Importing Redux Toolkit and Actions
// ==============================
import { createSlice } from "@reduxjs/toolkit";
import { login, logout, signup } from "../actions/authActions"; // Adjust the import path

// ==============================
// Type Definitions
// ==============================
interface AuthState {
  token: string | null;
  userId: string | null;
  loading: boolean;
  error: string | null;
}

// ==============================
// Initial State
// ==============================
const initialState: AuthState = {
  token: localStorage.getItem("token") || null, // Rehydrate token from localStorage if available
  userId: null,
  loading: false,
  error: null,
};

// ==============================
// Auth Slice Definition
// ==============================
const authSlice = createSlice({
  name: "auth",
  initialState, // Using the declared initialState
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Login cases
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.userId = action.payload.userId;
        localStorage.setItem("token", action.payload.token);
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Signup cases
      .addCase(signup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.userId = action.payload.userId;
        localStorage.setItem("token", action.payload.token);
      })
      .addCase(signup.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || "Signup failed";
      })

      // Logout case
      .addCase(logout.fulfilled, (state) => {
        state.token = null;
        state.userId = null;
        state.loading = false;
        state.error = null;
        localStorage.removeItem("token");
      })
      .addCase(logout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

// ==============================
// Export Reducer
// ==============================
export default authSlice.reducer;
