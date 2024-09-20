import React from "react";
import { useNavigate } from "react-router-dom";

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();

  // Example: Redirect to login if needed
  const handleLogout = () => {
    // Add your logout logic here
    // Example: navigate to login after logout
    navigate("/login");
  };

  return <div className="admin-dashboard">test</div>;
};

export default AdminDashboard;
