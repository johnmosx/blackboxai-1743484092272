const DashboardCard = ({ title, value, icon, color }) => {
  return (
    <div className={`${color} p-6 rounded-lg shadow-sm`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600">{title}</p>
          <h3 className="text-3xl font-bold mt-2">{value}</h3>
        </div>
        <span className="text-4xl">{icon}</span>
      </div>
    </div>
  );
};

export default DashboardCard;