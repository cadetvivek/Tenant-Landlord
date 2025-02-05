import React from 'react';
import { Building2, AlertCircle, DollarSign, Users } from 'lucide-react';

function DashboardStats() {
  const stats = [
    {
      icon: Building2,
      label: 'Total Properties',
      value: '12',
      change: '+2',
      changeType: 'increase',
    },
    {
      icon: AlertCircle,
      label: 'Open Requests',
      value: '8',
      change: '-3',
      changeType: 'decrease',
    },
    {
      icon: DollarSign,
      label: 'Revenue',
      value: '$24,500',
      change: '+12%',
      changeType: 'increase',
    },
    {
      icon: Users,
      label: 'Total Tenants',
      value: '45',
      change: '+5',
      changeType: 'increase',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="bg-white rounded-xl shadow-sm p-6 transition-transform hover:scale-105"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">{stat.label}</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
            </div>
            <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
              <stat.icon className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <div className="mt-4">
            <span
              className={`text-sm font-medium ${
                stat.changeType === 'increase'
                  ? 'text-green-600'
                  : 'text-red-600'
              }`}
            >
              {stat.change}
            </span>
            <span className="text-sm text-gray-500 ml-2">from last month</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default DashboardStats;