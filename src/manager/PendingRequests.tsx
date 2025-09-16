// components/PendingRequests.tsx
import React from "react";
import { FiInbox } from "react-icons/fi";
import { MdOutlinePendingActions } from "react-icons/md";

type PendingRequestsProps = {
  count?: number;
  subtitle?: string;
  className?: string;
};

const PendingRequests: React.FC<PendingRequestsProps> = ({
  count = 3,
  subtitle = "Awaiting approval",
  className = "",
}) => {
  return (
    <div
      className={`bg-white rounded-xl shadow p-4 flex items-center justify-between ${className}`}
      role="region"
      aria-label="Pending requests"
    >
      <div>
           <div className="flex gap-20">
            <p className=" text-black font-bold text-xl">Pending Requests</p>
             
                <div>
        <MdOutlinePendingActions className="text-orange-600" size={20}/>
      </div>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mt-5">{count}</h2>
        <p className="text-lg mt-3">{subtitle}</p>
     
       
      </div>

   
    </div>
  );
};

export default PendingRequests;
