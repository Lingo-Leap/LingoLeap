import React, {useState} from "react";
import { useNavigate } from "react-router-dom";


 






const UsersTable: React.FC = () => {
  const users = [
    {
      id: 1,
      username: 'john_doe',
      email: 'john@example.com',
      role: 'Admin',
      totalPoints: 1200,
      createdAt: '2023-01-15',
    },
    {
      id: 2,
      username: 'jane_smith',
      email: 'jane@example.com',
      role: 'User',
      totalPoints: 800,
      createdAt: '2023-02-20',
    },
  ];

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
                <button className="text-blue-500">Edit</button>
                <button className="text-red-500 ml-2">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const LanguagesTable: React.FC = () => {
  const [activeLessonId, setActiveLessonId] = useState<number | null>(null);

  const languages = [
    {
      id: 1,
      name: 'Spanish',
      description: 'A Romance language spoken in Spain and many Latin American countries.',
      numberOfLessons: 5,
      lessons: [
        'Introduction to Spanish',
        'Basic Greetings',
        'Numbers in Spanish',
        'Common Phrases',
        'Spanish Pronunciation',
      ],
    },
    {
      id: 2,
      name: 'French',
      description: 'A Romance language of the Gallo-Romance branch spoken in France and parts of Belgium and Switzerland.',
      numberOfLessons: 4,
      lessons: [
        'Introduction to French',
        'Basic Greetings',
        'Numbers in French',
        'Common Phrases',
      ],
    },
  ];

  const toggleLessons = (id: number) => {
    setActiveLessonId(activeLessonId === id ? null : id);
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">ID</th>
            <th className="py-2 px-4 border-b">Language</th>
            <th className="py-2 px-4 border-b">Description</th>
            <th className="py-2 px-4 border-b">Number of Lessons</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {languages.map((language) => (
            <React.Fragment key={language.id}>
              <tr onClick={() => toggleLessons(language.id)} className="cursor-pointer">
                <td className="py-2 px-4 border-b">{language.id}</td>
                <td className="py-2 px-4 border-b">{language.name}</td>
                <td className="py-2 px-4 border-b">{language.description}</td>
                <td className="py-2 px-4 border-b">{language.numberOfLessons}</td>
                <td className="py-2 px-4 border-b">
                  <button
                    className="text-blue-500"
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent the click from bubbling up to the row
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="text-red-500 ml-2"
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent the click from bubbling up to the row
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
              <tr className={`transition-all duration-300 ${language.id === activeLessonId ? '' : 'hidden'}`}>
                <td colSpan={5} className="bg-gray-100">
                  <ul className="border border-gray-300 rounded">
                    {language.lessons.map((lesson, index) => (
                      <li key={index} className="p-2 border-b">{lesson}</li>
                    ))}
                  </ul>
                </td>
              </tr>
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const AdminDashboard: React.FC = () => {

    const navigate = useNavigate();

    // Example: Redirect to login if needed
    const handleLogout = () => {
      // Add your logout logic here
      // Example: navigate to login after logout
      navigate("/login");
    }
    
  const [activeSection, setActiveSection] = useState<string>('users');

  const renderContent = () => {
    switch (activeSection) {
      case 'users':
        return <UsersTable />;
      case 'languages':
        return <LanguagesTable />;
      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg">
        <div className="p-4 text-xl font-bold border-b">Admin Panel</div>
        <ul className="mt-4">
          <li className="p-4 hover:bg-gray-200" onClick={() => setActiveSection('users')}>
            <a href="#">Users</a>
          </li>
          <li className="p-4 hover:bg-gray-200" onClick={() => setActiveSection('languages')}>
            <a href="#">Languages</a>
          </li>
          <li className="p-4 hover:bg-gray-200">
            <a href="#">Logout</a>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        {renderContent()}
      </div>
    </div>
  );
};


export default AdminDashboard;
