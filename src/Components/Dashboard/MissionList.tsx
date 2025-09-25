import React, { useState } from "react";
import { SiTicktick } from "react-icons/si";
import { FaCheck } from "react-icons/fa";
import { MdOutlinePendingActions } from "react-icons/md";
import { RiFileCloseLine } from "react-icons/ri";
import { FiSearch } from "react-icons/fi";

type MissionCardProps = {
  title: string;
  description: string;
  timestamp: string;
  status: "completed" | "approved" | "pending" | "rejected";
};

const MissionCard: React.FC<MissionCardProps> = ({
  title,
  description,
  timestamp,
  status,
}) => {
  const getIcon = () => {
    switch (status) {
      case "completed":
        return <SiTicktick size={30} className="text-green-500" />;
      case "approved":
        return <FaCheck size={30} className="text-green-500" />;
      case "pending":
        return <MdOutlinePendingActions size={30} className="text-[#FFB361]" />;
      case "rejected":
        return <RiFileCloseLine size={30} className="text-[#FA7878]" />;
      default:
        return null;
    }
  };

  return (
    <li className="rounded-lg bg-white shadow-sm flex gap-5 p-5 items-start w-[900px] max-sm:w-11/12 mx-auto">
      <div className="mt-3 bg-gray-100 p-2">{getIcon()}</div>
      <div>
        <h1 className="text-xl font-semibold">{title}</h1>
        <p className="text-sm text-start text-gray-800">{description}</p>
        <p className="text-xs text-gray-500">{timestamp}</p>
      </div>
    </li>
  );
};

const MissionList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const missions: MissionCardProps[] = [
    {
      title: "Imena Growth Initiative",
      description: "Your Mission to London was approved. Congratulations",
      timestamp: "Completed 2 months ago",
      status: "completed",
    },
    {
      title: "Agaciro Business Drive",
      description:
        "Mission to Saturn is waiting for your approval. Please review the details.",
      timestamp: "Approved 2 days ago",
      status: "approved",
    },
    {
      title: "Umurava Leadership Summit",
      description:
        "Mission to Saturn is waiting for your approval. Please review the details.",
      timestamp: "Pending since 3 days ago",
      status: "pending",
    },
    {
      title: "Gukunda Igihugu Corporate Pathway",
      description:
        "Mission to Venus has been successfully completed. Well done team!",
      timestamp: "Mission rejected 1 month ago",
      status: "rejected",
    },
  ];

  const filteredMissions = missions.filter((mission) =>
    mission.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col">
      <div className="py-2 mt-5 bg-gradient-to-l from-accent-10 rounded-md to-primaryColor-50">
        <h1 className="font-bold text-2xl text-center">Your Missions</h1>
      </div>

      {/* Search Box */}
      <div className="relative mb-4 mt-10 flex justify-center">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-400 p-2 pl-10 rounded w-1/2 max-sm:w-10/12 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        {searchTerm === "" && (
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-gray-400 flex items-center pointer-events-none">
            <FiSearch className="mr-2" />
            <span>Search missions...</span>
          </div>
        )}
      </div>

      {/* Missions List */}
      <ul className="flex flex-col gap-[10px] mt-5 items-center w-full">
        {filteredMissions.map((mission, index) => (
          <MissionCard key={index} {...mission} />
        ))}
      </ul>
    </div>
  );
};

export default MissionList;
