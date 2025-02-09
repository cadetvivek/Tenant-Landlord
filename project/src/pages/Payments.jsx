import React from 'react';

const PaymentHistory = () => {
  // Sample payment history data
  const payments = [
    {
      id: 1,
      date: '2025-02-08',
      amount: '₹25,000',
      property: 'Spacious 3BHK, Prime Location',
      status: 'Success',
      transactionId: 'RZP123456789'
    },
    {
      id: 2,
      date: '2025-02-09',
      amount: '₹35,000',
      property: 'Luxurious 2BHK Apartment',
      status: 'Success',
      transactionId: 'RZP987654321'
    },
    {
      id: 3,
      date: '2025-02-09',
      amount: '₹18,000',
      property: 'Studio Apartment Near Metro',
      status: 'Failed',
      transactionId: 'RZP456123789'
    }
  ];

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Payment History</h2>
      
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Property
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Transaction ID
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {payments.map((payment) => (
                <tr key={payment.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {payment.date}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 max-w-xs">
                    {payment.property}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-800">
                    {payment.amount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        payment.status === 'Success'
                          ? 'bg-green-100 text-green-800'
                          : payment.status === 'Pending'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {payment.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-mono">
                    {payment.transactionId}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {payments.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">No payment history found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentHistory;