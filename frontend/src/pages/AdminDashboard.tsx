import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../AdminUser.css";

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState<string>('users');
  
  // Users State
  const [users, setUsers] = useState<any[]>([]);
  const [loadingUsers, setLoadingUsers] = useState<boolean>(true);
  const [editingUser, setEditingUser] = useState<any>(null);
  
  // Languages State
  const [languages, setLanguages] = useState<any[]>([]);
  const [loadingLanguages, setLoadingLanguages] = useState<boolean>(true);
  const [editingLanguage, setEditingLanguage] = useState<any>(null);

  useEffect(() => {
    // Fetch users
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:1274/api/admin/user/all");
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoadingUsers(false);
      }
    };

    // Fetch languages
    const fetchLanguages = async () => {
      try {
        const response = await axios.get("http://localhost:1274/api/admin/languages/all");
        setLanguages(response.data);
      } catch (error) {
        console.error("Error fetching languages:", error);
      } finally {
        setLoadingLanguages(false);
      }
    };

    fetchUsers();
    fetchLanguages();
  }, []);

  const handleLogout = () => {
    // Add your logout logic here
    navigate("/login");
  };

  // User Handling
  const handleDeleteUser = async (id: number) => {
    try {
      await axios.delete(`http://localhost:1274/api/admin/user/delete/${id}`);
      setUsers(users.filter((user) => user.id !== id));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleEditUser = (user: any) => {
    setEditingUser(user);
  };

  const handleUpdateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:1274/api/admin/user/update/${editingUser.id}`, editingUser);
      setUsers(users.map((user) => (user.id === editingUser.id ? response.data : user)));
      setEditingUser(null);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };




  // Language Handling
  const handleDeleteLanguage = async (id: number) => {
    try {
      await axios.delete(`http://localhost:1274/api/admin/languages/${id}`);
      setLanguages(languages.filter((language) => language.id !== id));
    } catch (error) {
      console.error("Error deleting language:", error);
    }
  };

  const handleEditLanguage = (language: any) => {
    setEditingLanguage(language);
  };

  const handleUpdateLanguage = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:1274/api/admin/languages/${editingLanguage.id}`, editingLanguage);
      setLanguages(languages.map((language) => (language.id === editingLanguage.id ? response.data : language)));
      setEditingLanguage(null);
    } catch (error) {
      console.error("Error updating language:", error);
    }
  };

  // Render content based on active section
  const renderContent = () => {
    if (activeSection === 'users') {
      if (loadingUsers) {
        return <div>Loading users...</div>;
      }
      return (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">ID</th>
                <th className="py-2 px-4 border-b">Username</th>
                <th className="py-2 px-4 border-b">Email</th>
                <th className="py-2 px-4 border-b">Role</th>
                <th className="py-2 px-4 border-b">Total Points</th>
                <th className="py-2 px-4 border-b">Created At</th>
                <th className="py-2 px-4 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td className="py-2 px-4 border-b">{user.id}</td>
                  <td className="py-2 px-4 border-b">{user.username}</td>
                  <td className="py-2 px-4 border-b">{user.email}</td>
                  <td className="py-2 px-4 border-b">{user.role}</td>
                  <td className="py-2 px-4 border-b">{user.totalPoints}</td>
                  <td className="py-2 px-4 border-b">{user.createdAt}</td>
                  <td className="py-2 px-4 border-b">
                    <button className="text-blue-500" onClick={() => handleEditUser(user)}>Edit</button>
                    <button className="text-red-500 ml-2" onClick={() => handleDeleteUser(user.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {editingUser && (
            <div className="modal">
              <form onSubmit={handleUpdateUser}>
                <h2>Edit User</h2>
                <div>
                  <label>Username:</label>
                  <input type="text" value={editingUser.username} onChange={(e) => setEditingUser({ ...editingUser, username: e.target.value })} />
                </div>
                <div>
                  <label>Email:</label>
                  <input type="email" value={editingUser.email} onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })} />
                </div>
                <button type="submit">Update</button>
                <button type="button" onClick={() => setEditingUser(null)}>Cancel</button>
              </form>
            </div>
          )}
        </div>
      );
    } else if (activeSection === 'languages') {
      if (loadingLanguages) {
        return <div>Loading languages...</div>;
      }
      return (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">ID</th>
                <th className="py-2 px-4 border-b">Language</th>
                <th className="py-2 px-4 border-b">Description</th>
                <th className="py-2 px-4 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {languages.map((language) => (
                <tr key={language.id}>
                  <td className="py-2 px-4 border-b">{language.id}</td>
                  <td className="py-2 px-4 border-b">{language.name}</td>
                  <td className="py-2 px-4 border-b">{language.description}</td>
                  <td className="py-2 px-4 border-b">
                    <button className="text-blue-500" onClick={() => handleEditLanguage(language)}>Edit</button>
                    <button className="text-red-500 ml-2" onClick={() => handleDeleteLanguage(language.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {editingLanguage && (
            <div className="modal">
              <form onSubmit={handleUpdateLanguage}>
                <h2>Edit Language</h2>
                <div>
                  <label>Name:</label>
                  <input type="text" value={editingLanguage.name} onChange={(e) => setEditingLanguage({ ...editingLanguage, name: e.target.value })} />
                </div>
                <div>
                  <label>Description:</label>
                  <input type="text" value={editingLanguage.description} onChange={(e) => setEditingLanguage({ ...editingLanguage, description: e.target.value })} />
                </div>
                <button type="submit">Update</button>
                <button type="button" onClick={() => setEditingLanguage(null)}>Cancel</button>
              </form>
            </div>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="w-64 bg-white shadow-lg">
        <div className="p-4 text-xl font-bold border-b">Admin Panel</div>
        <ul className="mt-4">
      
          <li className="p-4 hover:bg-gray-200 cursor-pointer" onClick={() => setActiveSection('users')}>
            Users
          </li>
          <li className="p-4 hover:bg-gray-200 cursor-pointer" onClick={() => setActiveSection('languages')}>
            Languages
          </li>
          <li className="p-4 hover:bg-gray-200 cursor-pointer" onClick={handleLogout}>
            Logout
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        {renderContent()}
      </div>
    </div>
  );
}

export default AdminDashboard;
