import React from 'react';
import { Link } from 'react-router-dom';

const FarmerTable = () => {
  // Temporary mock data - will be replaced with API data
  const farmers = [
    { id: 1, name: 'John Doe', location: 'North Field', contact: '555-1234' },
    { id: 2, name: 'Jane Smith', location: 'South Field', contact: '555-5678' },
    { id: 3, name: 'Robert Johnson', location: 'East Field', contact: '555-9012' },
  ];

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {farmers.map((farmer) => (
            <tr key={farmer.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{farmer.name}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{farmer.location}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{farmer.contact}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <Link 
                  to={`/farmers/${farmer.id}`} 
                  className="text-green-600 hover:text-green-900 mr-3"
                >
                  View
                </Link>
                <button className="text-red-600 hover:text-red-900">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FarmerTable;