// components/RecentActivities.tsx
import React from "react";
import { FiClock } from "react-icons/fi";

const activities = [
  { message: "Sarah Johnson submitted a request", time: "2 hours ago" },
  { message: "Request from Mike Chen awaiting review", time: "2 days ago" },
  { message: "Budget Alert", time: "1 day ago" },
];

const RecentActivities: React.FC = () => {
  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Recent Activities</h2>
      <ul className="space-y-4">
        {activities.map((activity, index) => (
          <li
            key={index}
            className="flex items-start gap-3 p-3 rounded-md bg-gray-50 hover:bg-gray-100 transition"
          >
            <FiClock className="text-blue-600 mt-1" size={18} />
            <div>
              <p className="text-sm text-gray-700">{activity.message}</p>
              <span className="text-xs text-gray-500">{activity.time}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentActivities;
