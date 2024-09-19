
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signup } from '../store/features/authSlice';
import { RootState, AppDispatch } from '../store/store'; 
import { useNavigate } from 'react-router-dom';

const Signup: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const [profilePicture, setProfilePicture] = useState<File | null>(null); // Handle profile picture

  const dispatch = useDispatch<AppDispatch>(); 
  const navigate = useNavigate();
  const { loading, error } = useSelector((state: RootState) => state.auth);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Create FormData to handle file uploads
    const formData = new FormData();
    formData.append('username', username);
    formData.append('email', email);
    formData.append('passwordHash', password);
    formData.append('role', role);
    if (profilePicture) {
      formData.append('profilePicture', profilePicture); // Attach file if available
    }

    dispatch(signup(formData)) // Dispatch FormData
      .unwrap()
      .then(() => navigate('/login'))
      .catch(() => {});
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6 text-center">Signup</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full mb-4 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mb-4 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full mb-4 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full mb-4 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
            <option value="teacher">Teacher</option>
          </select>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setProfilePicture(e.target.files ? e.target.files[0] : null)}
            className="w-full mb-4 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="w-full bg-green-500 text-white p-3 rounded-md hover:bg-green-600 transition duration-300"
            disabled={loading}
          >
            {loading ? 'Signing up...' : 'Signup'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;



