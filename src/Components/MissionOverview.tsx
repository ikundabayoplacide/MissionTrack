import React from "react";
import { ClipboardList, CheckCircle, Clock, XCircle } from "lucide-react";
import OverviewCard from "./OverviewCard";

const MissionOverview: React.FC = () => {
  const stats = [
    { 
      title: "All Missions", 
      value: 12, 
      color: "text-blue-600", 
      icon: ClipboardList 
    },
    { 
      title: "Completed", 
      value: 12, 
      color: "text-green-600", 
      icon: CheckCircle 
    },
    { 
      title: "Pending", 
      value: 12, 
      color: "text-yellow-600", 
      icon: Clock 
    },
    { 
      title: "Rejected", 
      value: 12, 
      color: "text-red-600", 
      icon: XCircle 
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6 ml-4">
      {stats.map((stat, index) => (
        <OverviewCard
          key={index}
          title={stat.title}
          value={stat.value}
          color={stat.color}
          icon={stat.icon}
        />
      ))}
    </div>
  );
};

export default MissionOverview;
