import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  { year: 2020, Approved: 20, Pending: 15, Rejected: 5 },
  { year: 2021, Approved: 40, Pending: 20, Rejected: 10 },
  { year: 2022, Approved: 65, Pending: 25, Rejected: 15 },
  { year: 2023, Approved: 80, Pending: 30, Rejected: 25 },
  { year: 2024, Approved: 0, Pending: 0, Rejected: 0 },
  { year: 2025, Approved: 0, Pending: 0, Rejected: 0 },
];

const AnnualMissionStatuses: React.FC = () => {
  return (
    <div className="bg-white shadow-lg rounded-2xl w-[320px] p-4">
      <h2 className="font-semibold mb-4">Annual Mission Statuses</h2>
      <ResponsiveContainer width="100%" height={280}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorApproved" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#22c55e" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorPending" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#facc15" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#facc15" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorRejected" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
            </linearGradient>
          </defs>

          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="year" />
          <YAxis />
          <Tooltip />
          <Legend />

          <Area
            type="monotone"
            dataKey="Pending"
            stroke="#facc15"
            fillOpacity={1}
            fill="url(#colorPending)"
          />
          <Area
            type="monotone"
            dataKey="Approved"
            stroke="#22c55e"
            fillOpacity={1}
            fill="url(#colorApproved)"
          />
          <Area
            type="monotone"
            dataKey="Rejected"
            stroke="#ef4444"
            fillOpacity={1}
            fill="url(#colorRejected)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AnnualMissionStatuses;
