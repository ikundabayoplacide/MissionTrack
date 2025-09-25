// components/MissionPurpose.tsx
import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Client meetings", value: 20 },
  { name: "Training", value: 10 },
  { name: "Support", value: 30 },
  { name: "Conferences", value: 40 },
];

const COLORS = ["#22c55e", "#ef4444", "#f59e0b", "#3b82f6"];

const MissionPurpose: React.FC = () => {
  return (
    <div className="bg-white  rounded-xl h-full shadow p-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        Mission Purpose
      </h2>
      <div className="h-64 ">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={90}
              dataKey="value"
              paddingAngle={2}
              label={({ value }) => `${value}%`}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4 space-y-2">
        {data.map((entry, index) => (
          <div key={index} className="flex items-center space-x-2">
            <span
              className="inline-block w-3 h-3 rounded-full"
              style={{ backgroundColor: COLORS[index] }}
            ></span>
            <span className="text-sm text-gray-700">{entry.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MissionPurpose;
