import React from "react";
import { useNavigate } from "react-router-dom";

interface CompanyHeaderProps {
  companyName: string;
  status: "Pending Review" | "Approved" | "Rejected";
}

const CompanyHeader: React.FC<CompanyHeaderProps> = ({ companyName, status }) => {
  const navigate = useNavigate();

  // SVG Back Arrow
  const backArrowIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-4 w-4 mr-2"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M10 19l-7-7m0 0l7-7m-7 7h18"
      />
    </svg>
  );

  // Dynamic badge styles
  const statusStyles: Record<string, string> = {
    "Pending Review": "text-yellow-700 bg-yellow-100 border-yellow-300",
    Approved: "text-green-700 bg-green-100 border-green-300",
    Rejected: "text-red-700 bg-red-100 border-red-300",
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-5xl mx-auto flex justify-between items-center">
      {/* Left: Back button */}
      <button
        onClick={() => navigate("/companies")}
        className="flex items-center px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200"
      >
        {backArrowIcon}
        Back to companies
      </button>

      {/* Center: Company Name */}
      <h2 className="flex-1 text-center text-2xl font-bold text-gray-800">
        {companyName}
      </h2>

      {/* Right: Status Badge */}
      <div
        className={`px-4 py-2 rounded-full font-medium text-sm border ${
          statusStyles[status] || "text-gray-700 border-gray-300"
        }`}
      >
        {status}
      </div>
    </div>
  );
};

export default CompanyHeader;
