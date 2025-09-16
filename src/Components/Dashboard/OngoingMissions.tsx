import React from "react";
import { useTheme } from "../../hook/useTheme";

// Example ongoing missions
const missions = [
  {
    title: "M.E.M- Rubavu",
    color: "bg-green-500",
  },
];

const OngoingMissions: React.FC = () => {
  const { theme } = useTheme();

  return (
    <div
      className={`rounded-xl shadow-sm p-5 ${
        theme === "light" ? "bg- text-black" : "bg-gray-800 text-white"
      }`}
    >
      <h3 className="font-bold text-gray-800 mb-4">Ongoing Missions</h3>

      <div className="space-y-3">
        {missions.map((mission, index) => (
          <div
            key={index}
            className="flex items-center justify-between rounded-lg px-4 py-3 "
          >
            {/* Colored dot + title */}
            <div className="flex items-center gap-8 w-65">
              
              <p className="font-medium">{mission.title}</p>
              <span className={`w-3 h-3 rounded-full ${mission.color}`} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OngoingMissions;
