import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const data = [
  { name: "Used", value: 600 },
  { name: "Remaining", value: 200 },
];

const COLORS = {
  Used: "#3b82f6",      // blue
  Remaining: "#e5e7eb", // gray
};

const totalBudget = 800;
const usedBudget = 600;
const usedPercentage = Math.round((usedBudget / totalBudget) * 100);

const ExpensesChart: React.FC = () => {
  return (
    <div className="bg-white shadow-lg rounded-2xl text-center">
      <h2 className="font-semibold mb-2">Expenses</h2>
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={90}
            paddingAngle={3}
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
        </PieChart>
      </ResponsiveContainer>

      {/* Text Summary */}
      <div className="mt-2">
        <p className="font-semibold text-lg text-blue-600">{usedPercentage}% Used</p>
        <p className="text-sm text-gray-500">Total Budget: {totalBudget}K</p>
        <p className="text-sm text-red-500">Used: {usedBudget}K</p>
      </div>
    </div>
  );
};

export default ExpensesChart;
