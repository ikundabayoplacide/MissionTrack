import React from "react";

interface MissionReportHeaderProps {
  title: string;
  location: string;
  dateRange: string;
  status: "Ongoing" | "Completed" | "Pending";
  onBack?: () => void;
}

const ReportHeader: React.FC<MissionReportHeaderProps> = ({
  title,
  location,
  dateRange,
  status,
  onBack,
}) => {
  // Status color mapping
  const statusColors: Record<typeof status, string> = {
    Ongoing: "bg-yellow-500",
    Completed: "bg-green-500",
    Pending: "bg-gray-500",
  };

  return (
    <header className="bg-white rounded-xl shadow-lg p-6 w-full max-w-5xl mx-auto flex justify-between items-center">
      {/* Left section: Back button */}
      <button
        onClick={onBack}
        aria-label="Back to Reports"
        className="flex items-center px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 mr-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back to Reports
      </button>

      {/* Center section: Mission Details */}
      <div className="flex-1 flex flex-col items-center">
        <h2 className="text-xl font-bold text-gray-800 mb-4">{title}</h2>
        <div className="flex items-center text-sm text-gray-600 space-x-6">
          <div className="flex items-center">
            <svg className="h-5 w-5 text-gray-500 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span>{title}</span>
          </div>
          <div className="flex items-center">
            <svg className="h-5 w-5 text-gray-500 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span>{location}</span>
          </div>
          <div className="flex items-center">
            <svg className="h-5 w-5 text-gray-500 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h.01M17 11h.01M3 15h2m-2-4h2m11 0h2m-2 4h2M5 19h2M3 19h2M19 19h2M19 11h2M3 15h.01M17 15h.01M3 19h.01M19 19h.01M5 15h.01M12 12v.01M12 16v.01" />
            </svg>
            <span>{dateRange}</span>
          </div>
        </div>
      </div>

      {/* Right section: Status badge */}
      <div
        className={`px-4 py-2 ${statusColors[status]} text-white rounded-full font-medium text-sm`}
        aria-label={`Mission status: ${status}`}
      >
        {status}
      </div>
    </header>
  );
};

export default ReportHeader;
