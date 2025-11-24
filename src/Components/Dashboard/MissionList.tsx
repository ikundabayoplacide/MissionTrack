import React, { useEffect, useState } from "react";
import { FiSearch, FiCalendar, FiMapPin, FiFileText } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { fetchEmployeeMissions } from "../../redux/EmployeeRedux/EmpMissions";

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

  const filteredMissions = missionArray.filter((mission: any) =>
    mission.missionTitle?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    mission.location?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case "approved":
      case "financial_approved":
        return "bg-green-100 text-green-700 border-green-200";
      case "rejected":
        return "bg-red-100 text-red-700 border-red-200";
      case "pending":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const formatStatus = (status: string) => {
    if (status === "Financial_approved") return "Finance Approved";
    return status?.charAt(0).toUpperCase() + status?.slice(1) || "Pending";
  };

  return (
    <div className="flex flex-col bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden w-full">
      {/* Header Section */}
      <div className="p-6 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">My Missions</h1>
          <p className="text-sm text-gray-500 mt-1">Track and manage your mission requests</p>
        </div>

        {/* Search Box */}
        <div className="relative w-full sm:w-72">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm"
            placeholder="Search by title or location..."
          />
          <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
        </div>
      </div>

      {/* Table Section */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50/50 border-b border-gray-200 text-xs uppercase tracking-wider text-gray-500 font-semibold">
              <th className="px-6 py-4">Mission Details</th>
              <th className="px-6 py-4">Location</th>
              <th className="px-6 py-4">Duration</th>
              <th className="px-6 py-4">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {loading ? (
              <tr>
                <td colSpan={4} className="px-6 py-12 text-center">
                  <div className="flex flex-col items-center justify-center gap-3">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                    <p className="text-sm text-gray-500 font-medium">Loading your missions...</p>
                  </div>
                </td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan={4} className="px-6 py-12 text-center text-red-500">
                  {error}
                </td>
              </tr>
            ) : filteredMissions.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-12 text-center">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <div className="bg-gray-100 p-3 rounded-full">
                      <FiFileText className="text-gray-400" size={24} />
                    </div>
                    <p className="text-gray-900 font-medium">No missions found</p>
                    <p className="text-sm text-gray-500">Try adjusting your search or create a new request</p>
                  </div>
                </td>
              </tr>
            ) : (
              filteredMissions.map((mission: any, index: number) => (
                <tr
                  key={index}
                  className="hover:bg-blue-50/30 transition-colors duration-200 group"
                >
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="font-semibold text-gray-900 group-hover:text-blue-700 transition-colors">
                        {mission.missionTitle}
                      </span>
                      <span className="text-sm text-gray-500 line-clamp-1 mt-0.5">
                        {mission.missionDescription || "No description provided"}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-gray-600">
                      <FiMapPin size={16} className="text-gray-400" />
                      <span className="text-sm font-medium">{mission.location}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-gray-600">
                      <FiCalendar size={16} className="text-gray-400" />
                      <div className="flex flex-col text-xs">
                        <span className="font-medium text-gray-900">
                          {new Date(mission.startDate).toLocaleDateString()}
                        </span>
                        <span className="text-gray-500">
                          to {new Date(mission.endDate).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(mission.status)}`}>
                      {formatStatus(mission.status)}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MissionList;
