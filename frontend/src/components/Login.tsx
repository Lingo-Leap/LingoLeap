import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../store/features/authSlice";
import { RootState, AppDispatch } from "../store/store";
import { useNavigate } from "react-router-dom";

interface LoginResponse {
  token: string;
  userId: string;
}

// Optionally define the error type if you know what it looks like
interface LoginError {
  message: string; // Adjust based on your error structure
}

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { loading, error } = useSelector((state: RootState) => state.auth);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response: LoginResponse = await dispatch(
        login({ email, passwordHash: password })
      ).unwrap();
      localStorage.setItem("authToken", response.token);
      localStorage.setItem("userId", response.userId);
      navigate("/home");
    } catch (err) {
      const errorMessage = (err as LoginError).message || "Login failed";
      console.error("Login failed", errorMessage);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      {/* Login Box */}
      <div className="w-full max-w-md p-8 bg-gray-800 rounded-lg shadow-2xl">
        <h2 className="mb-6 text-3xl font-bold text-center text-white">
          Connexion
        </h2>

        {/* Error Message */}
        {error && <p className="mb-4 text-red-500">{error}</p>}

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="E-mail ou nom d'utilisateur"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 mb-4 text-white placeholder-gray-400 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <input
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 mb-4 text-white placeholder-gray-400 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          {/* Login Button */}
          <button
            type="submit"
            className="w-full p-3 font-bold text-white transition duration-300 bg-blue-500 rounded-md hover:bg-blue-600"
            disabled={loading}
          >
            {loading ? "Connexion..." : "Se connecter"}
          </button>
        </form>

        {/* Social Login Options */}
        {/* <div className="flex items-center justify-between mt-6">
          <button className="flex items-center px-4 py-2 space-x-2 font-bold text-white bg-gray-700 rounded-md hover:bg-gray-600">
            <span className="text-blue-500">f</span> <span>Facebook</span>
          </button>
          <button className="flex items-center px-4 py-2 space-x-2 font-bold text-white bg-gray-700 rounded-md hover:bg-gray-600">
            <span className="text-red-500">G</span> <span>Google</span>
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default Login;
