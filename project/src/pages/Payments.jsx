
import React from 'react';
import { IndianRupee, Download, ChevronDown, Filter, Clock, AlertTriangle } from 'lucide-react';

function Payments() {
  const payments = [
    {
      id: 1,
      tenant: 'Sarah Johnson',
      property: 'Sunset Apartments',
      unit: 'Unit 304',
      amount: 1500,
      status: 'paid',
      date: '2024-03-15',
      method: 'Credit Card',
    },
    {
      id: 2,
      tenant: 'Michael Brown',
      property: 'Pine Grove Complex',
      unit: 'Unit 12B',
      amount: 1800,
      status: 'pending',
      date: '2024-03-01',
      method: 'Bank Transfer',
    },
    {
      id: 3,
      tenant: 'Emma Wilson',
      property: 'Oakwood Heights',
      unit: 'Unit 506',
      amount: 2000,
      status: 'overdue',
      date: '2024-02-28',
      method: 'Check',
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 text-green-700';
      case 'pending':
        return 'bg-yellow-100 text-yellow-700';
      case 'overdue':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-900">Payments</h1>
      <p className="text-gray-600">Track and manage rent payments</p>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Collected</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">₹24,500</p>
            </div>
            <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
              <IndianRupee className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <p className="text-sm text-green-600 mt-4">+12% from last month</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pending</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">₹3,800</p>
            </div>
            <div className="w-12 h-12 bg-yellow-50 rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
          <p className="text-sm text-yellow-600 mt-4">2 payments pending</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Overdue</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">₹2,000</p>
            </div>
            <div className="w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
          </div>
          <p className="text-sm text-red-600 mt-4">1 payment overdue</p>
        </div>
      </div>

      {/* Payments Table */}
      <div className="bg-white rounded-xl shadow-sm">
        <div className="p-4 border-b flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Recent Payments</h2>
          <button className="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg">
            <Filter className="w-5 h-5 mr-2" />
            Filter
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-sm text-gray-500 border-b">
                <th className="px-6 py-3 font-medium">Tenant</th>
                <th className="px-6 py-3 font-medium">Property</th>
                <th className="px-6 py-3 font-medium">Amount</th>
                <th className="px-6 py-3 font-medium">Status</th>
                <th className="px-6 py-3 font-medium">Date</th>
                <th className="px-6 py-3 font-medium">Method</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment) => (
                <tr key={payment.id} className="border-b">
                  <td className="px-6 py-4">{payment.tenant}</td>
                  <td className="px-6 py-4">{payment.property}</td>
                  <td className="px-6 py-4">${payment.amount}</td>
                  <td className={`px-6 py-4 ${getStatusColor(payment.status)}`}>{payment.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Payments;
