import React from 'react';
import { Building2, Users, DollarSign } from 'lucide-react';

function PropertyOverview() {
  const properties = [
    {
      id: 1,
      name: 'Sunset Apartments',
      units: 12,
      occupancy: '92%',
      revenue: '$15,800',
      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=400',
    },
    {
      id: 2,
      name: 'Pine Grove Complex',
      units: 8,
      occupancy: '87%',
      revenue: '$12,400',
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=400',
    },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold text-gray-900">Property Overview</h2>
        <button className="text-sm font-medium text-blue-600 hover:text-blue-700">
          Add Property
        </button>
      </div>

      <div className="space-y-6">
        {properties.map((property) => (
          <div
            key={property.id}
            className="border rounded-lg p-4 hover:border-blue-200 transition-colors"
          >
            <div className="flex space-x-4">
              <img
                src={property.image}
                alt={property.name}
                className="w-20 h-20 rounded-lg object-cover"
              />
              <div className="flex-1">
                <h3 className="font-medium text-gray-900">{property.name}</h3>
                <div className="mt-2 grid grid-cols-3 gap-4">
                  <div className="flex items-center text-sm text-gray-500">
                    <Building2 className="w-4 h-4 mr-1" />
                    {property.units} units
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Users className="w-4 h-4 mr-1" />
                    {property.occupancy}
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <DollarSign className="w-4 h-4 mr-1" />
                    {property.revenue}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-6 border-t">
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-500">Total Properties</span>
          <span className="font-medium text-gray-900">2 properties</span>
        </div>
        <div className="flex justify-between items-center text-sm mt-2">
          <span className="text-gray-500">Total Units</span>
          <span className="font-medium text-gray-900">20 units</span>
        </div>
        <div className="flex justify-between items-center text-sm mt-2">
          <span className="text-gray-500">Average Occupancy</span>
          <span className="font-medium text-gray-900">89.5%</span>
        </div>
      </div>
    </div>
  );
}

export default PropertyOverview;