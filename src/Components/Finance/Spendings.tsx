import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";

interface DataItem {
  name: string;
  value: number;
  color: string;
}

const data: DataItem[] = [
  { name: "Meal", value: 20, color: "#10B981" },
  { name: "Accommodation", value: 10, color: "#EF4444" },
  { name: "Transport", value: 30, color: "#F59E0B" },
  { name: "Others", value: 40, color: "#2563EB" },
];

interface CustomLegendProps {
  data: DataItem[];
}

const CustomLegend: React.FC<CustomLegendProps> = ({ data }) => {
  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="flex flex-col items-start  text-sm">
      {data.map((entry, index) => {
        const percentage = ((entry.value / total) * 100).toFixed(0);
        return (
          <div
            key={`legend-${index}`}
            className="flex items-center  "
            aria-label={`${entry.name}: ${percentage}%`}
          >
            <div
              className="w-2.5 h-2.5 rounded-full"
              style={{ backgroundColor: entry.color }}
            ></div>
            <span className="text-gray-700">
              {entry.name} — {percentage}%
            </span>
          </div>
        );
      })}
    </div>
  );
};

const SpendingsChart: React.FC = () => {
  return (
    <div className="p-6 bg-white rounded-xl shadow-md w-full max-w-lg mx-auto">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">
        Spending Breakdown By Category
      </h2>

      <div className="flex flex-col md:flex-row items-center justify-center space-y-6 md:space-y-0 md:space-x-8">
        <CustomLegend data={data} />
        <div className="w-full h-64 md:h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
                labelLine={{ stroke: "#D1D5DB" }}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default SpendingsChart;
