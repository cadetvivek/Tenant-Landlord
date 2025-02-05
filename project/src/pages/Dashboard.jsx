import React from 'react';
import DashboardStats from '../components/DashboardStats';
import MaintenanceRequests from '../components/MaintenanceRequests';
import RecentActivity from '../components/RecentActivity';
import PropertyOverview from '../components/PropertyOverview';

function Dashboard() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Welcome back, Vivek!</h1>
        <p className="text-gray-600">Here's what's happening with your properties today.</p>
      </div>

      <DashboardStats />

      <div className="grid lg:grid-cols-3 gap-6 mt-8">
        <div className="lg:col-span-2">
          <MaintenanceRequests />
          <RecentActivity />
        </div>
        <div className="lg:col-span-1">
          <PropertyOverview />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;