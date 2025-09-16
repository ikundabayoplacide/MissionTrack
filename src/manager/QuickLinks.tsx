// components/QuickLinks.tsx
import React from "react";
import { FiCheckCircle, FiCalendar, FiUserPlus } from "react-icons/fi";
import { Link } from "react-router-dom";

const quickLinks = [
  { label: "Active Missions", icon: FiCheckCircle, path: "/missions/active" },
  { label: "Schedules", icon: FiCalendar, path: "/schedules" },
  { label: "Add New Employee", icon: FiUserPlus, path: "/employees/new" },
];

const QuickLinks: React.FC = () => {
  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Quick Links</h2>
      <ul className="space-y-3">
        {quickLinks.map(({ label, icon: Icon, path }) => (
          <li key={label}>
            <Link
              to={path}
              className="flex items-center gap-3 p-3 rounded-md bg-gray-50 hover:bg-gray-100 transition"
            >
              <Icon className="text-blue-600" size={18} />
              <span className="text-sm font-medium text-gray-700">{label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuickLinks;
