import React from "react";
import { useTheme } from "../hook/useTheme";

const RecentActivities: React.FC = () => {
  const { theme } = useTheme();
  const isLight = theme === "light";

  return (
    <div
      className={`rounded-xl shadow-sm p-5 ${
        isLight ? "bg-white text-black" : "bg-gray-800 text-white"
      }`}
    >
      {/* Section title */}
      <h3 className="font-bold mb-4">Recent Activities</h3>

      <div className="space-y-3">
        {/* Activity 1 - Mission approved */}
        <div
          className={`flex items-start gap-3 rounded-lg px-4 py-3  bg-green-100`}
        >
          <span className="w-3 h-3 rounded-full mt-1 bg-green-400" />
          <div>
            <p className="font-medium text-gray-800">
              Mission To London approved
            </p>
            <p className="text-xs text-gray-500">2 hours ago</p>
          </div>
        </div>

        {/* Activity 2 - New request submitted */}
        <div
          className={`flex items-start gap-3 rounded-lg px-4 py-3  bg-blue-100`}
        >
          <span className="w-3 h-3 rounded-full mt-1 bg-blue-500" />
          <div>
            <p className="font-medium text-gray-800">New request submitted</p>
            <p className="text-xs text-gray-500">5 hours ago</p>
          </div>
        </div>

        {/* Activity 3 - Budget review pending */}
        <div
          className={`flex items-start gap-3 rounded-lg px-4 py-3  bg-orange-100`}
        >
          <span className="w-3 h-3 rounded-full mt-1 bg-orange-400" />
          <div>
            <p className="font-medium text-gray-800">Budget review pending</p>
            <p className="text-xs text-gray-500">1 day ago</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecentActivities;
