import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Approved", value: 1 },
  { name: "Pending", value: 2 },
  { name: "Rejected", value: 3 },
];

const COLORS = {
  Approved: "#22c55e", // green
  Pending: "#facc15",  // yellow
  Rejected: "#ef4444", // red
};

const ThisMonthChart: React.FC = () => {
  return (
    <div className="bg-white shadow-lg w-[320px] rounded-2xl p-4">
      <h2 className="font-semibold mb-4">This Month</h2>
      <ResponsiveContainer width="100%" height={280}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={90}
            label={({ name, value }) => `${name} ${value}`}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[entry.name as keyof typeof COLORS]}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend
            layout="vertical"
            align="left"
            verticalAlign="middle"
            formatter={(value) => (
              <span className="text-sm font-medium text-gray-700">{value}</span>
            )}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ThisMonthChart;
