import React from 'react';
import { Building2, Users, DollarSign, Plus } from 'lucide-react';

function Properties() {
  const properties = [
    {
      id: 1,
      name: 'Sunset Apartments',
      address: '123 Sunset Blvd, Los Angeles, CA 90028',
      units: 12,
      occupancy: '92%',
      revenue: '$15,800',
      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=400',
    },
    {
      id: 2,
      name: 'Pine Grove Complex',
      address: '456 Pine St, San Francisco, CA 94101',
      units: 8,
      occupancy: '87%',
      revenue: '$12,400',
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=400',
    },
    {
      id: 3,
      name: 'Oakwood Heights',
      address: '789 Oak Road, Seattle, WA 98101',
      units: 15,
      occupancy: '95%',
      revenue: '$18,900',
      image: 'https://images.unsplash.com/photo-1460317442991-0ec209397118?auto=format&fit=crop&w=400',
    },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Properties</h1>
          <p className="text-gray-600">Manage your property portfolio</p>
        </div>
        <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          <Plus className="w-5 h-5 mr-2" />
          Add Property
        </button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {properties.map((property) => (
          <div
            key={property.id}
            className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow"
          >
            <img
              src={property.image}
              alt={property.name}
              className="w-full h-48 object-cover rounded-t-xl"
            />
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900">{property.name}</h3>
              <p className="text-sm text-gray-500 mt-1">{property.address}</p>
              
              <div className="mt-4 grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="flex items-center justify-center w-10 h-10 bg-blue-50 rounded-lg mx-auto">
                    <Building2 className="w-5 h-5 text-blue-600" />
                  </div>
                  <p className="text-sm font-medium text-gray-900 mt-2">{property.units}</p>
                  <p className="text-xs text-gray-500">Units</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center w-10 h-10 bg-green-50 rounded-lg mx-auto">
                    <Users className="w-5 h-5 text-green-600" />
                  </div>
                  <p className="text-sm font-medium text-gray-900 mt-2">{property.occupancy}</p>
                  <p className="text-xs text-gray-500">Occupancy</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center w-10 h-10 bg-yellow-50 rounded-lg mx-auto">
                    <DollarSign className="w-5 h-5 text-yellow-600" />
                  </div>
                  <p className="text-sm font-medium text-gray-900 mt-2">{property.revenue}</p>
                  <p className="text-xs text-gray-500">Revenue</p>
                </div>
              </div>

              <button className="w-full mt-6 px-4 py-2 bg-gray-50 text-gray-600 rounded-lg hover:bg-gray-100">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Properties;