import React from 'react';
import { Calendar as CalendarIcon, Clock, MapPin, Users } from 'lucide-react';

function Schedule() {
  const appointments = [
    {
      id: 1,
      title: 'Property Inspection',
      property: 'Sunset Apartments',
      unit: 'Unit 304',
      date: '2024-03-20',
      time: '10:00 AM',
      type: 'inspection',
      attendees: ['John Doe', 'Sarah Johnson'],
    },
    {
      id: 2,
      title: 'AC Repair',
      property: 'Pine Grove Complex',
      unit: 'Unit 12B',
      date: '2024-03-21',
      time: '2:00 PM',
      type: 'maintenance',
      attendees: ['Tech Team', 'Michael Brown'],
    },
    {
      id: 3,
      title: 'Lease Signing',
      property: 'Oakwood Heights',
      unit: 'Unit 506',
      date: '2024-03-22',
      time: '11:30 AM',
      type: 'meeting',
      attendees: ['Emma Wilson', 'Legal Team'],
    },
  ];

  const getEventColor = (type) => {
    switch (type) {
      case 'inspection':
        return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'maintenance':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'meeting':
        return 'bg-green-100 text-green-700 border-green-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Schedule</h1>
          <p className="text-gray-600">Manage appointments and meetings</p>
        </div>
        <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          <CalendarIcon className="w-5 h-5 mr-2" />
          New Appointment
        </button>
      </div>

      <div className="grid lg:grid-cols-7 gap-6">
        {/* Calendar */}
        <div className="lg:col-span-5 bg-white rounded-xl shadow-sm p-6">
          <div className="text-center">
            {/* Calendar component would go here */}
            <p className="text-gray-500">Calendar integration coming soon...</p>
          </div>
        </div>

        {/* Upcoming Appointments */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Upcoming</h2>
            <div className="space-y-4">
              {appointments.map((appointment) => (
                <div
                  key={appointment.id}
                  className={`p-4 rounded-lg border ${getEventColor(appointment.type)}`}
                >
                  <h3 className="font-medium">{appointment.title}</h3>
                  <div className="mt-2 space-y-2 text-sm">
                    <div className="flex items-center">
                      <CalendarIcon className="w-4 h-4 mr-2" />
                      <span>{appointment.date}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-2" />
                      <span>{appointment.time}</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-2" />
                      <span>{appointment.property} - {appointment.unit}</span>
                    </div>
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-2" />
                      <span>{appointment.attendees.join(', ')}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Schedule;