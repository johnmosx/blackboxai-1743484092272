import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api';

const FarmerView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [farmer, setFarmer] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchFarmer = async () => {
      try {
        const response = await api.get(`/farmers/${id}`);
        setFarmer(response.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch farmer');
      } finally {
        setIsLoading(false);
      }
    };
    fetchFarmer();
  }, [id]);

  if (isLoading) return <div className="p-4">Loading...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;
  if (!farmer) return <div className="p-4">Farmer not found</div>;

  return (
    <div className="max-w-3xl mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Farmer Details</h2>
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
        >
          Back
        </button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Basic Information</h3>
              <div className="space-y-2">
                <p><span className="font-medium">Name:</span> {farmer.name}</p>
                <p><span className="font-medium">Location:</span> {farmer.location}</p>
                <p><span className="font-medium">Contact:</span> {farmer.contact}</p>
                <p><span className="font-medium">Farm Size:</span> {farmer.farmSize} acres</p>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Crops</h3>
              {farmer.crops && farmer.crops.length > 0 ? (
                <ul className="space-y-1">
                  {farmer.crops.map((crop, index) => (
                    <li key={index}>{crop}</li>
                  ))}
                </ul>
              ) : (
                <p>No crops recorded</p>
              )}
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <button
              onClick={() => navigate(`/farmers/${farmer.id}`)}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              Edit Farmer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FarmerView;