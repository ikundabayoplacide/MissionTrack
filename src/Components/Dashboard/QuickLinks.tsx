import React from "react";
import { FiFilePlus, FiCalendar, FiBarChart2 } from "react-icons/fi";
import { useTheme } from "../../hook/useTheme";
import { Link } from "react-router-dom";


const QuickLinks: React.FC = () => {
  const { theme } = useTheme();
  const isLight = theme === "light";

  return (
    <div
      className={`rounded-xl shadow-sm p-5 ${
        isLight ? "bg-white text-black" : "bg-gray-800 text-white"
      }`}
    >
      {/* Section title */}
      <h3 className="font-bold mb-4">Quick Links</h3>

      <div className="space-y-3">
        {/* Create a new request */}
        <Link to={"/request"}
          className={`flex items-center gap-3 w-full rounded-lg px-4 py-3 transition ${
            isLight ? "bg-gray-50" : "bg-gray-700"
          }`}
        >
          <div className="h-10 w-10 flex items-center justify-center rounded-md">
            <FiFilePlus className="text-blue-600 text-lg" />
          </div>
          <span className="font-medium">Create a new request</span>
        </Link>

        {/* View Calendar */}
        <button
          className={`flex items-center gap-3 w-full rounded-lg px-4 py-3 transition ${
            isLight ? "bg-gray-50" : "bg-gray-700"
          }`}
        >
          <div className="h-10 w-10 flex items-center justify-center rounded-md">
            <FiCalendar className="text-red-600 text-lg" />
          </div>
          <span className="font-medium">View Calendar</span>
        </button>

        {/* View Reports */}
        <button
          className={`flex items-center gap-3 w-full rounded-lg px-4 py-3 transition ${
            isLight ? "bg-gray-50" : "bg-gray-700"
          }`}
        >
          <div className="h-10 w-10 flex items-center justify-center rounded-md">
            <FiBarChart2 className="text-green-600 text-lg" />
          </div>
          <span className="font-medium">View Reports</span>
        </button>
      </div>
    </div>
  );
};

export default QuickLinks;
