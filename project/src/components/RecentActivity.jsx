import React from 'react';
import { MessageSquare, Key, PenTool as Tool, CreditCard } from 'lucide-react';

function RecentActivity() {
  const activities = [
    {
      id: 1,
      type: 'message',
      title: 'New Message',
      description: 'Sarah from Unit 304 sent a message about parking',
      time: '10 minutes ago',
      icon: MessageSquare,
    },
    {
      id: 2,
      type: 'lease',
      title: 'Lease Signed',
      description: 'New tenant signed lease for Unit 12B',
      time: '2 hours ago',
      icon: Key,
    },
    {
      id: 3,
      type: 'maintenance',
      title: 'Maintenance Completed',
      description: 'Plumbing issue in Unit 506 resolved',
      time: '4 hours ago',
      icon: Tool,
    },
    {
      id: 4,
      type: 'payment',
      title: 'Rent Payment',
      description: 'Received rent payment for Unit 304',
      time: '1 day ago',
      icon: CreditCard,
    },
  ];

  const getActivityColor = (type) => {
    switch (type) {
      case 'message':
        return 'bg-purple-100 text-purple-600';
      case 'lease':
        return 'bg-green-100 text-green-600';
      case 'maintenance':
        return 'bg-blue-100 text-blue-600';
      case 'payment':
        return 'bg-yellow-100 text-yellow-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold text-gray-900">Recent Activity</h2>
        <button className="text-sm font-medium text-blue-600 hover:text-blue-700">
          View all
        </button>
      </div>

      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start space-x-4">
            <div
              className={`w-10 h-10 rounded-lg flex items-center justify-center ${getActivityColor(
                activity.type
              )}`}
            >
              <activity.icon className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-medium text-gray-900">
                {activity.title}
              </h3>
              <p className="text-sm text-gray-500 mt-1">{activity.description}</p>
              <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecentActivity;