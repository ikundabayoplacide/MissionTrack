import React, { useEffect, useState } from "react";
import { SiTicktick } from "react-icons/si";
import { FaCheck } from "react-icons/fa";
import { MdOutlinePendingActions } from "react-icons/md";
import { RiFileCloseLine } from "react-icons/ri";
import { FiSearch } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { fetchEmployeeMissions } from "../../redux/EmployeeRedux/EmpMissions";

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
 <li className="rounded-lg bg-white shadow-sm mb-10 flex gap-5 p-2 items-start w-[900px] max-sm:w-11/12 mx-auto">
  <div className="mt-3 bg-gray-100 ">{getIcon()}</div>
  <div className="flex-1 flex justify-between items-start">
    <div>
      <h1 className="text-xl font-semibold">{title}</h1>
      <p className="text-md text-start text-gray-800">{description}</p>
      <p className="text-sm text-gray-500">{timestamp}</p>
    </div>
    <div className="flex items-start">
      <p
        className={`text-xs font-semibold ${
          status === "completed"
            ? "text-green-500"
            : status === "rejected"
            ? "text-red-500"
            : "text-yellow-500"
        }`}
      >
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </p>
    </div>
  </div>
</li>

  );
};

const MissionList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const { missions, loading, error } = useSelector((state: RootState) => state.EmployeeMissions as {
    missions: any[] | { missions: any[] };
    loading: boolean;
    error: string | null;
  });

  useEffect(() => {
    dispatch(fetchEmployeeMissions());
  }, [dispatch]);

  const missionArray = Array.isArray(missions)
    ? missions
    : missions?.missions || [];

  const mappedMissions: MissionCardProps[] = missionArray.map((m: any) => ({
    title: m.missionTitle,
    description: m.missionDescription || "No description provided",
    timestamp: `From ${new Date(m.startDate).toLocaleDateString()} To  ${new Date(m.endDate).toLocaleDateString()}`,
    status: m.status?.toLowerCase() || "pending",
  }));
  const filteredMissions = mappedMissions.filter((mission) =>
    mission.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col bg-white rounded-lg p-2 shadow-md w-full">
      <div className="py-2 bg-gradient-to-l from-accent-10 rounded-md to-primaryColor-50">
        <h1 className="font-bold text-2xl text-center">Your Missions</h1>
      </div>

      {/* Search Box */}
      <div className="flex justify-end mb-4 mt-6 pr-5">
        <div className="relative w-60">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-gray-400 p-2 pl-9 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
            placeholder="Search missions..."
          />
          <FiSearch className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400" />
        </div>
      </div>

      {/* Missions List */}
      <ul className="flex flex-col gap-[10px] mt-5 items-center w-full">
        {loading && (
          <div className="flex justify-center py-4">
            <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-blue-500"></div>
            <p className="ml-2 text-gray-500">Loading missions...</p>
          </div>
        )}

        {error && <p className="text-center text-red-500">{error}</p>}
        {filteredMissions.length > 0 ? (
          filteredMissions.map((mission, index) => (
            <MissionCard key={index} {...mission} />
          ))
        ) : (
          !loading && <p className="text-center text-gray-500">No missions found.</p>
        )}
      </ul>
    </div>
  );
};

export default MissionList;
