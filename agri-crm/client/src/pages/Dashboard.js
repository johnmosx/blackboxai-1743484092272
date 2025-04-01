import React from 'react';
import DashboardCard from '../components/DashboardCard';

const Dashboard = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <DashboardCard 
          title="Total Farmers" 
          value="124" 
          icon="👨‍🌾"
          color="bg-blue-100"
        />
        <DashboardCard 
          title="Active Crops" 
          value="87" 
          icon="🌱"
          color="bg-green-100"
        />
        <DashboardCard 
          title="Pending Tasks" 
          value="15" 
          icon="📝"
          color="bg-yellow-100"
        />
      </div>
    </div>
  );
};

export default Dashboard;