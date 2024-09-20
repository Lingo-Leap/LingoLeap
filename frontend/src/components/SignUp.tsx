import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signup } from "../store/features/authSlice";
import { RootState, AppDispatch } from "../store/store";
import { useNavigate } from "react-router-dom";

const Signup: React.FC = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [profilePicture, setProfilePicture] = useState<File | null>(null);

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state: RootState) => state.auth);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Create FormData to handle file uploads
    const formData = new FormData();
    formData.append("username", username);
    formData.append("email", email);
    formData.append("passwordHash", password);
    formData.append("role", role);
    if (profilePicture) {
      formData.append("profilePicture", profilePicture);
    }

    dispatch(signup(formData))
      .unwrap()
      .then(() => navigate("/login"))
      .catch(() => {});
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      {/* Signup Box */}
      <div className="w-full max-w-md p-8 bg-gray-800 rounded-lg shadow-2xl">
        <h2 className="mb-6 text-3xl font-bold text-center text-white">
          Signup
        </h2>

        {/* Error Message */}
        {error && <p className="mb-4 text-red-500">{error}</p>}

        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-3 mb-4 text-white placeholder-gray-400 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 mb-4 text-white placeholder-gray-400 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 mb-4 text-white placeholder-gray-400 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full p-3 mb-4 text-white bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
            <option value="teacher">Teacher</option>
          </select>

          <input
            type="file"
            accept="image/*"
            onChange={(e) =>
              setProfilePicture(e.target.files ? e.target.files[0] : null)
            }
            className="w-full p-3 mb-4 text-white bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            type="submit"
            className="w-full p-3 font-bold text-white transition duration-300 bg-green-500 rounded-md hover:bg-green-600"
            disabled={loading}
          >
            {loading ? "Signing up..." : "Sign up"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
