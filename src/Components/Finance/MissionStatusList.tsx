import React from "react";

// Props for a single mission item
interface MissionItemProps {
  missionTitle: string;
  reviewerInfo: string;
}

// Reusable Eye Icon Component
const EyeIcon: React.FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-4 w-4 mr-1"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    aria-hidden="true"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 
         8.268 2.943 9.542 7-1.274 4.057-5.064 
         7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
    />
  </svg>
);

// A reusable component for each mission item in the list
const MissionItem: React.FC<MissionItemProps> = ({ missionTitle, reviewerInfo }) => {
  return (
    <div className="flex justify-between items-center p-4 bg-white rounded-lg border border-gray-200 shadow-sm">
      <div className="flex flex-col">
        <div className="font-semibold text-gray-800">{missionTitle}</div>
        <div className="text-sm text-gray-500">{reviewerInfo}</div>
      </div>
      <button
        className="flex items-center px-4 py-2 border border-gray-300 rounded-lg shadow-sm 
                   text-sm font-medium text-gray-700 hover:bg-gray-50 
                   focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200"
        aria-label={`Review ${missionTitle}`}
      >
        <EyeIcon />
        Review
      </button>
    </div>
  );
};

// The main component containing the list of recent missions
const MissionStatusList: React.FC = () => {
  const missions: MissionItemProps[] = [
    { missionTitle: "Water Supply Project", reviewerInfo: "Sarah Johnson - Rusizi" },
    { missionTitle: "Community Health Outreach", reviewerInfo: "David Smith - Kigali" },
    { missionTitle: "School Renovation", reviewerInfo: "Emily Carter - Huye" },
    { missionTitle: "Reforestation Program", reviewerInfo: "Michael Brown - Musanze" },
    { missionTitle: "Road Maintenance", reviewerInfo: "Grace Uwase - Rwamagana" },
    { missionTitle: "ICT Training", reviewerInfo: "John Doe - Rubavu" },
  ];

  return (
    <div className="p-6 bg-white rounded-xl shadow-lg w-[746px]  max-w-md mx-auto">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Recent Missions Waiting Approval
      </h2>
      <div className="flex flex-col space-y-2 mb-4">
        {missions.map((mission, index) => (
          <MissionItem
            key={index}
            missionTitle={mission.missionTitle}
            reviewerInfo={mission.reviewerInfo}
          />
        ))}
      </div>
      <button
        className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm 
                   text-sm font-medium text-gray-700 hover:bg-gray-50 
                   focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200"
      >
        View More Pending
      </button>
    </div>
  );
};

export default MissionStatusList;
