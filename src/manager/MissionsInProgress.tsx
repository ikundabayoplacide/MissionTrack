// components/MissionsInProgress.tsx
import React from "react";
import { FiClock } from "react-icons/fi";

type MissionsInProgressProps = {
  count?: number;
  subtitle?: string;
  trend?: string;
  className?: string;
};

const MissionsInProgress: React.FC<MissionsInProgressProps> = ({
  count = 12,
  subtitle = "Missions in Progress",
  trend = "Active Mission",
  className = "",
}) => {
  return (
    <div
      className={`bg-white rounded-xl shadow p-4 flex items-center justify-between ${className}`}
      role="region"
      aria-label="Missions in progress"
    >
      <div>
        <div className="flex gap-19">
          <p className="text-lg font-bold">{subtitle}</p>
           <div>
        <FiClock className="text-blue-600" size={20}/>
      </div>
        </div>
        
        <h2 className="text-2xl font-bold text-gray-900 mt-5">{count}</h2>
        <p className="text-lg mt-3">{trend}</p>
      </div>

     
    </div>
  );
};

export default MissionsInProgress;
