import React from 'react';
import { Link } from 'react-router-dom';
import FarmerTable from '../components/FarmerTable';

const Farmers = () => {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Farmers</h1>
        <Link 
          to="/farmers/new" 
          className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
        >
          Add Farmer
        </Link>
      </div>
      <FarmerTable />
    </div>
  );
};

export default Farmers;