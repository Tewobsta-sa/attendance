import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

const Dashboard = () => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl mb-4">Welcome, {user.name}!</h1>
      <p>Your role: {user.role}</p>
      {/* TODO: Add role-based dashboard components */}
    </div>
  );
};

export default Dashboard;
