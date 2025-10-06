import React from 'react';
import Dashboard from '../components/Dashboard';

const DashboardPage = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold">Operator Dashboard</h1>
          <p className="text-gray-600">View and manage all water bills</p>
          <a href="/" className="text-blue-500 hover:underline float-right">← Back to Home</a>
        </div>
      </div>
      <Dashboard />
    </div>
  );
};

export default DashboardPage;