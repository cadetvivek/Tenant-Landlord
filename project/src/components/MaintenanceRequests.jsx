import React from 'react';
import { Clock, AlertTriangle, CheckCircle } from 'lucide-react';

function MaintenanceRequests() {
  const requests = [
    {
      id: 1,
      title: 'Leaking Faucet',
      property: 'Sunset Apartments, Unit 304',
      status: 'urgent',
      date: '2h ago',
      description: 'Water leaking from kitchen sink faucet',
    },
    {
      id: 2,
      title: 'AC Not Working',
      property: 'Pine Grove Complex, Unit 12B',
      status: 'in-progress',
      date: '1d ago',
      description: 'Air conditioning unit making loud noise and not cooling',
    },
    {
      id: 3,
      title: 'Light Fixture Replacement',
      property: 'Oakwood Heights, Unit 506',
      status: 'completed',
      date: '2d ago',
      description: 'Living room ceiling light needs replacement',
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'urgent':
        return 'bg-red-100 text-red-700';
      case 'in-progress':
        return 'bg-yellow-100 text-yellow-700';
      case 'completed':
        return 'bg-green-100 text-green-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'urgent':
        return AlertTriangle;
      case 'in-progress':
        return Clock;
      case 'completed':
        return CheckCircle;
      default:
        return Clock;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold text-gray-900">Maintenance Requests</h2>
        <button className="text-sm font-medium text-blue-600 hover:text-blue-700">
          View all
        </button>
      </div>

      <div className="space-y-4">
        {requests.map((request) => {
          const StatusIcon = getStatusIcon(request.status);
          return (
            <div
              key={request.id}
              className="border rounded-lg p-4 hover:border-blue-200 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-medium text-gray-900">{request.title}</h3>
                  <p className="text-sm text-gray-500 mt-1">{request.property}</p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                    request.status
                  )}`}
                >
                  <StatusIcon className="w-4 h-4 inline-block mr-1" />
                  {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                </span>
              </div>
              <p className="text-sm text-gray-600 mt-2">{request.description}</p>
              <div className="mt-3 text-xs text-gray-500">{request.date}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default MaintenanceRequests;