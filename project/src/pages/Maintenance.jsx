import React, { useState } from 'react';
import { Wrench, AlertTriangle, Clock, CheckCircle, Plus, Filter } from 'lucide-react';

function Maintenance() {
  const [filter, setFilter] = useState('all');

  const requests = [
    {
      id: 1,
      title: 'Leaking Faucet',
      property: 'Sunset Apartments',
      unit: 'Unit 304',
      status: 'urgent',
      priority: 'high',
      date: '2024-03-15',
      description: 'Water leaking from kitchen sink faucet, causing water damage to cabinet.',
      tenant: 'Sarah Johnson',
      image: 'https://media.istockphoto.com/id/486929190/photo/sink-drip.jpg?s=612x612&w=0&k=20&c=1jhpCvF5LCIM6OkQdcSSGuYzv8uvhB81E_CkUTznPTU=',
    },
    {
      id: 2,
      title: 'AC Not Working',
      property: 'Pine Grove Complex',
      unit: 'Unit 12B',
      status: 'in-progress',
      priority: 'medium',
      date: '2024-03-14',
      description: 'Air conditioning unit making loud noise and not cooling properly.',
      tenant: 'Michael Brown',
      image: 'https://rukminim2.flixcart.com/image/850/1000/xif0q/air-conditioner-new/3/o/z/-original-imagmh8caxhtfp5t.jpeg?q=90&crop=false',
    },
    {
      id: 3,
      title: 'Light Fixture Replacement',
      property: 'Oakwood Heights',
      unit: 'Unit 506',
      status: 'completed',
      priority: 'low',
      date: '2024-03-13',
      description: 'Living room ceiling light needs replacement, current fixture is flickering.',
      tenant: 'Emma Wilson',
      image: 'https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?auto=format&fit=crop&w=400',
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
        return Wrench;
    }
  };

  const filteredRequests = filter === 'all' 
    ? requests 
    : requests.filter(request => request.status === filter);

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Maintenance Requests</h1>
          <p className="text-gray-600">Track and manage maintenance issues</p>
        </div>
        <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          <Plus className="w-5 h-5 mr-2" />
          New Request
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm mb-6">
        <div className="p-4 border-b flex items-center justify-between">
          <div className="flex space-x-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg text-sm font-medium ${
                filter === 'all' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilter('urgent')}
              className={`px-4 py-2 rounded-lg text-sm font-medium ${
                filter === 'urgent' ? 'bg-red-50 text-red-600' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              Urgent
            </button>
            <button
              onClick={() => setFilter('in-progress')}
              className={`px-4 py-2 rounded-lg text-sm font-medium ${
                filter === 'in-progress' ? 'bg-yellow-50 text-yellow-600' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              In Progress
            </button>
            <button
              onClick={() => setFilter('completed')}
              className={`px-4 py-2 rounded-lg text-sm font-medium ${
                filter === 'completed' ? 'bg-green-50 text-green-600' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              Completed
            </button>
          </div>
          <button className="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg">
            <Filter className="w-5 h-5 mr-2" />
            Filter
          </button>
        </div>

        <div className="divide-y">
          {filteredRequests.map((request) => {
            const StatusIcon = getStatusIcon(request.status);
            return (
              <div key={request.id} className="p-6 hover:bg-gray-50">
                <div className="flex items-start space-x-4">
                  <img
                    src={request.image}
                    alt={request.title}
                    className="w-24 h-24 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">{request.title}</h3>
                        <p className="text-sm text-gray-500 mt-1">
                          {request.property} - {request.unit}
                        </p>
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
                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex items-center text-sm text-gray-500">
                        <span className="mr-4">Tenant: {request.tenant}</span>
                        <span>Reported: {request.date}</span>
                      </div>
                      <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Maintenance;