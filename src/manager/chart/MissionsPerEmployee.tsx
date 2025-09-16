// components/MissionsPerEmployee.tsx
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const data = [
  { name: "Alice", missions: 8 },
  { name: "Bob", missions: 12 },
  { name: "Charlie", missions: 5 },
  { name: "Diana", missions: 9 },
  { name: "Ethan", missions: 7 },
];

const MissionsPerEmployee: React.FC = () => {
  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        Missions per Employee
      </h2>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200" />
            <XAxis dataKey="name" className="text-sm" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="missions" fill="#2563eb" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default MissionsPerEmployee;
