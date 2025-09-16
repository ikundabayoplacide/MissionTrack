// components/ApprovedMissions.tsx
import React from "react";
import { FiCheckCircle } from "react-icons/fi";

type ApprovedMissionsProps = {
  count?: number;
  subtitle?: string;
  trend?: string;
  another?: string;
  className?: string;
};

const ApprovedMissions: React.FC<ApprovedMissionsProps> = ({
  count = 5,
  subtitle = "Approved Missions",
  trend = "+16% ",
  another="vs Last month",
  className = "",
}) => {
  return (
    <div
      className={`bg-white rounded-xl shadow p-4 flex items-center justify-between ${className}`}
      role="region"
      aria-label="Approved missions"
    >
      <div>
        <div className="flex gap-19">
             <p className="text-black font-bold text-xl">{subtitle}</p>
            <div className=" text-green-600">
        <FiCheckCircle size={20}  />
      </div>
        </div>
        
        <h2 className="text-2xl font-bold text-gray-900 mt-5">{count}</h2>
       <p className="text-lg mt-3">
        <span className=" text-green-600">{trend} </span>{another}
       </p>
        </div>
        
      </div>

     
    
  );
};

export default ApprovedMissions;
