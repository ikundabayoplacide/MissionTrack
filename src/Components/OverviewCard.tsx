import type { LucideIcon } from "lucide-react";
import React from "react";


interface OverviewCardProps {
  title: string;
  value: number;
  color: string;
  icon: LucideIcon;
}

const OverviewCard: React.FC<OverviewCardProps> = ({ title, value, color, icon: Icon }) => {
  return (
    <div className="bg-white shadow rounded-lg p-4 grid items-center">
      {/* Icon */}
      <div className={`p-2 rounded-full mr-4 flex justify-between items-center`}>
        <span className="text-sm font-medium text-gray-600">{title}</span>
        <Icon className={`w-6 h-6 ${color}`} />
         
      </div>

      {/* Text */}
      <div>
        <div className={`text-xl font-bold ${color}`}>{value}</div>
      </div>
    </div>
  );
};

export default OverviewCard;
