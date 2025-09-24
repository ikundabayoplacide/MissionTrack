import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { PiBagSimple } from "react-icons/pi";
import { IoLocationOutline } from "react-icons/io5";
import { BsCalendar2Event } from "react-icons/bs";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { FaCheck } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";

// --------------------
// Reusable Card
// --------------------
type MissionStatus = "pending" | "approved" | "rejected";

interface MissionCardProps {
  initials: string;
  name: string;
  role: string;
  title: string;
  location: string;
  dateRange: string;
  status: MissionStatus;
  onApprove?: () => void;
  onReject?: () => void;
  onDetails?: () => void;
}

const MissionCard: React.FC<MissionCardProps> = ({
  initials,
  name,
  role,
  title,
  location,
  dateRange,
  status,
  onApprove,
  onReject,
  onDetails,
}) => {
  const statusStyles: Record<MissionStatus, string> = {
    pending: "text-yellow-600 border border-yellow-600 bg-yellow-100",
    approved: "text-white bg-accent-800 border border-accent-400",
    rejected: "text-red-600 border border-red-600 bg-red-50",
  };

  return (
    <li className="max-w-md mx-auto grid  md:w-[320px] lg:w-[450px]  bg-white rounded-xl shadow-md overflow-hidden m-4 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <div className="h-12 w-12 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-lg">
              {initials}
            </div>
          </div>
          <div className="ml-4">
            <div className="text-xl font-bold text-gray-900">{name}</div>
            <p className="text-gray-500">{role}</p>
          </div>
        </div>
        <div
          className={`px-3 py-1 text-sm font-semibold rounded-full ${statusStyles[status]}`}
        >
          {status}
        </div>
      </div>

      {/* Details */}
      <div className="mt-6 space-y-4">
        <div className="flex items-center">
          <PiBagSimple size={25} />
          <p className="ml-3 text-gray-700">{title}</p>
        </div>
        <div className="flex items-center">
          <IoLocationOutline size={25} />
          <p className="ml-3 text-gray-700">{location}</p>
        </div>
        <div className="flex items-center">
          <BsCalendar2Event size={25} />
          <p className="ml-3 text-gray-700">{dateRange}</p>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-6 flex justify-between space-x-4">
        <button
          onClick={onDetails}
          className="flex-1 gap-2 flex items-center justify-center px-10 py-2 border border-gray-300 rounded-2xl shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          <MdOutlineRemoveRedEye size={25} />
          Details
        </button>

        {status === "pending" && (
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={onApprove}
              className="flex-1 gap-2 flex items-center justify-center px-4 py-2 rounded-2xl shadow-sm text-sm font-medium text-white bg-accent-600"
            >
              <FaCheck size={20} />
              Approve
            </button>
            <button
              onClick={onReject}
              className="flex-1 gap-2 flex items-center justify-center px-4 py-2 rounded-2xl shadow-sm text-sm font-medium text-red-600"
            >
              <RxCross2 size={20} />
              Reject
            </button>
          </div>
        )}
      </div>
    </li>
  );
};

// --------------------
// Main Page
// --------------------
const RequestManager: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const missions = [
    {
      initials: "SJ",
      name: "Sarah Johnson",
      role: "Marketing Manager",
      title: "Mission Title",
      location: "Location",
      dateRange: "Jan 12, 2025 - Jan 12, 2025",
      status: "pending" as const,
    },
    {
      initials: "SJ",
      name: "Sarah Johnson",
      role: "Marketing Manager",
      title: "Mission Title",
      location: "Location",
      dateRange: "Jan 12, 2025 - Jan 12, 2025",
      status: "rejected" as const,
    },
    {
      initials: "SJ",
      name: "Sarah Johnson",
      role: "Marketing Manager",
      title: "Mission Title",
      location: "Location",
      dateRange: "Jan 12, 2025 - Jan 12, 2025",
      status: "approved" as const,
    },
  ];

  return (
    <div className="flex flex-col">
      <div className="py-2 mt-5 bg-gradient-to-l from-accent-10 rounded-md to-primaryColor-50">
        <h1 className="font-bold text-2xl text-center">Requests</h1>
      </div>

      {/* Search Box */}
      <div className="relative mb-4 mt-10 flex justify-center">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-400 p-2 pl-10 rounded w-1/2 max-sm:w-10/12 focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder=""
        />
        {searchTerm === "" && (
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-gray-400 flex items-center pointer-events-none">
            <FiSearch className="mr-2" />
            <span>Search missions...</span>
          </div>
        )}
      </div>

      {/* Mission Cards */}
      <ul className="grid grid-cols-2 gap-[30px]  mt-5 items-center w-full">
        {missions.map((mission, idx) => (
          <MissionCard key={idx} {...mission} />
        ))}
      </ul>
    </div>
  );
};

export default RequestManager;
