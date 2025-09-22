import React from 'react';
import { RiMoneyDollarCircleLine } from "react-icons/ri";

// A reusable card component for the dashboard
const DashboardCard = ({ title, value, change, valueColor, icon, iconBgColor, iconColor }) => {
  return (
    <div className="flex-1 p-6 bg-white rounded-xl shadow-md flex  w-[240px] flex-col space-y-4">
      <div className="flex justify-between items-center">
        <p className="text-gray-700 font-medium">{title}</p>
        <div className={`p-2 rounded-lg ${iconBgColor}`}>
          <div className={`${iconColor}`}>{icon}</div>
        </div>
      </div>
      <div className="space-y-1">
        <h3 className={`text-2xl font-bold ${valueColor}`}>{value}</h3>
        <p className="text-sm text-gray-500">{change}</p>
      </div>
    </div>
  );
};

// The main component containing all four cards
const Revenue = () => {
  // SVGs for the icons
  const dollarIcon = (
     <RiMoneyDollarCircleLine  size={20} className="" />
  );

  const cardIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
    </svg>
  );

  const alertIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938-7.938l5.5 5.5m0 0L12 17.5l-5.5-5.5-5.5 5.5L12 17.5-6.938 12.062z" />
    </svg>
  );

  return (
    <div className="flex flex-col text-xl md:flex-row space-y-4 md:space-y-0 md:space-x-4 p-4">
      <DashboardCard
        title="Month Revenue"
        value="4,987,543 Rwf"
        change="+9 From Last Month"
        valueColor="text-green-600"
        icon={dollarIcon}
        iconBgColor="bg-green-100"
        iconColor="text-green-600"
      />
      <DashboardCard
        title="Pending Payments"
        value="2,987,234 Rwf"
        change="+9 From Last Month"
        valueColor="text-yellow-600"
        icon={cardIcon}
        iconBgColor="bg-yellow-100"
        iconColor="text-yellow-600"
      />
      <DashboardCard
        title="Overdue Accounts"
        value="3"
        change="+9 From Last Month"
        valueColor="text-orange-600"
        icon={alertIcon}
        iconBgColor="bg-orange-100"
        iconColor="text-orange-600"
      />
      <DashboardCard
        title="Failed Payments"
        value="3"
        change="+9 From Last Month"
        valueColor="text-red-600"
        icon={alertIcon}
        iconBgColor="bg-red-100"
        iconColor="text-red-600"
      />
    </div>
  );
};

export default Revenue;