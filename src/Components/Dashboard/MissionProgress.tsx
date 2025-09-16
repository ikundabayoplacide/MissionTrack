import React from "react";
import { useTheme } from "../../hook/useTheme";

// Example progress data
const progress = [

  { label: "Mission to Tokyo", percent: 48, color: "bg-green-800" },

];

const MissionProgress: React.FC = () => {
  const { theme } = useTheme();

  return (
    <div
      className={`rounded-xl h-37 shadow-sm p-5 ${
        theme === "light" ? "bg-white text-black" : "bg-gray-800 text-white"
      }`}
    >
      <h3 className="font-bold text-gray-800 mb-4">Mission Progress</h3>

      <div className="space-y-4">
        {progress.map((item, index) => (
          <div key={index}>
            <div className="flex justify-between text-sm">
              <span className="text-red-500 text-lg mb-2">{item.percent}%</span>
              
              
            </div>
            {/* Progress bar */}
            <div className=" bg-gray-200 rounded-full h-2">
              <div
                className={`h-2 rounded-full ${item.color}`}
                style={{ width: `${item.percent}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MissionProgress;
