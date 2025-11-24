import React, { useEffect, useState } from "react";
import { FiSearch, FiFilter, FiEye, FiCheck, FiX, FiCalendar, FiUser, FiBriefcase, FiMapPin } from "react-icons/fi";
import axios from "axios";

// --------------------
// Helper Components
// --------------------

const Badge = ({ text }: { text: string }) => {
  const getColorClasses = (status: string) => {
    switch (status?.toLowerCase()) {
      case "approved":
      case "financial_approved":
        return "bg-green-100 text-green-700 border border-green-200";
      case "rejected":
        return "bg-red-100 text-red-700 border border-red-200";
      case "pending":
        return "bg-yellow-100 text-yellow-700 border border-yellow-200";
      case "inprogress":
        return "bg-blue-100 text-blue-700 border border-blue-200";
      default:
        return "bg-gray-100 text-gray-700 border border-gray-200";
    }
  };

  const formatStatus = (status: string) => {
    if (status === "Financial_approved") return "Finance Approved";
    return status?.charAt(0).toUpperCase() + status?.slice(1) || "N/A";
  };

  return (
    <span className={`px-2.5 py-0.5 inline-flex items-center rounded-full text-xs font-medium ${getColorClasses(text)}`}>
      {formatStatus(text)}
    </span>
  );
};

// --------------------
// Main Component
// --------------------

const AllMission: React.FC = () => {
  const [missions, setMissions] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [loading, setLoading] = useState(true);
  const [selectedMission, setSelectedMission] = useState<any | null>(null);
  const [actionLoading, setActionLoading] = useState(false);

  const statusOptions = [
    "All Status",
    "pending",
    "approved",
    "rejected",
  ];

  // Fetch missions
  const fetchMissions = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/missions/manager`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMissions(res.data.data || []);
    } catch (err) {
      console.error("Error fetching missions:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMissions();
  }, []);

  // Update Status Action
  const updateStatus = async (missionId: string, action: "Approve" | "Reject") => {
    setActionLoading(true);
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/actions/create`,
        {
          missionId,
          action,
          comment: `${action}d by manager`,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Update local state
      setMissions((prev) =>
        prev.map((m) =>
          m.id === missionId ? { ...m, status: action.toLowerCase() } : m
        )
      );
      setSelectedMission(null);
    } catch (err) {
      console.error("Error updating mission status:", err);
      alert("Failed to update mission status");
    } finally {
      setActionLoading(false);
    }
  };

  // Filter Logic
  const filteredMissions = missions.filter((m) => {
    const query = searchQuery.toLowerCase();
    const matchesSearch =
      (m.missionTitle?.toLowerCase() || "").includes(query) ||
      (m.fullName?.toLowerCase() || "").includes(query) ||
      (m.jobPosition?.toLowerCase() || "").includes(query);

    const matchesStatus =
      statusFilter === "All Status" ||
      (m.status?.toLowerCase() || "") === statusFilter.toLowerCase();

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-[#E6EAF5] p-6">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* Header */}
        <div className="bg-gradient-to-r from-blue-900 to-blue-700 rounded-2xl p-8 text-white shadow-lg relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('/pattern.png')]"></div>
          <div className="relative z-10">
            <h1 className="text-3xl font-bold">Mission Requests</h1>
            <p className="text-blue-100 mt-2">Review and manage employee mission requests</p>
          </div>
        </div>

        {/* Controls & Table Container */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">

          {/* Controls */}
          <div className="p-6 border-b border-gray-100 flex flex-col md:flex-row gap-4 justify-between items-center bg-white">
            <div className="relative w-full md:w-96">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by title, employee, or position..."
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm"
              />
            </div>

            <div className="flex items-center gap-3 w-full md:w-auto">
              <div className="relative w-full md:w-48">
                <FiFilter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm appearance-none cursor-pointer"
                >
                  {statusOptions.map((status) => (
                    <option key={status} value={status}>
                      {status === "All Status" ? "All Status" : status.charAt(0).toUpperCase() + status.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/50 border-b border-gray-200 text-xs uppercase tracking-wider text-gray-500 font-semibold">
                  <th className="px-6 py-4">Employee</th>
                  <th className="px-6 py-4">Mission Details</th>
                  <th className="px-6 py-4">Duration</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {loading ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center">
                      <div className="flex flex-col items-center justify-center gap-3">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                        <p className="text-sm text-gray-500 font-medium">Loading requests...</p>
                      </div>
                    </td>
                  </tr>
                ) : filteredMissions.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center">
                      <div className="flex flex-col items-center justify-center gap-2">
                        <div className="bg-gray-100 p-3 rounded-full">
                          <FiBriefcase className="text-gray-400" size={24} />
                        </div>
                        <p className="text-gray-900 font-medium">No requests found</p>
                        <p className="text-sm text-gray-500">Try adjusting your filters</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredMissions.map((mission) => (
                    <tr key={mission.id} className="hover:bg-blue-50/30 transition-colors duration-200">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-sm">
                            {mission.fullName?.charAt(0).toUpperCase() || "U"}
                          </div>
                          <div>
                            <div className="font-semibold text-gray-900">{mission.fullName || "Unknown"}</div>
                            <div className="text-xs text-gray-500">{mission.jobPosition || "N/A"}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <span className="font-medium text-gray-900">{mission.missionTitle}</span>
                          <span className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                            <FiMapPin size={12} /> {mission.location || "N/A"}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-gray-600 text-sm">
                          <FiCalendar size={14} className="text-gray-400" />
                          <div className="flex flex-col text-xs">
                            <span>{new Date(mission.startDate).toLocaleDateString()}</span>
                            <span className="text-gray-400">to</span>
                            <span>{new Date(mission.endDate).toLocaleDateString()}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <Badge text={mission.status} />
                      </td>
                      <td className="px-6 py-4 text-center">
                        <button
                          onClick={() => setSelectedMission(mission)}
                          className="inline-flex items-center justify-center p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="View Details"
                        >
                          <FiEye size={18} />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Details Modal */}
      {selectedMission && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden animate-scaleIn">
            {/* Modal Header */}
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-lg font-bold text-gray-800">Mission Details</h3>
              <button
                onClick={() => setSelectedMission(null)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <FiX size={24} />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              {/* Employee Info */}
              <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-xl border border-blue-100">
                <div className="h-12 w-12 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-lg">
                  {selectedMission.fullName?.charAt(0).toUpperCase() || "U"}
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">{selectedMission.fullName}</h4>
                  <p className="text-sm text-blue-600">{selectedMission.jobPosition}</p>
                </div>
                <div className="ml-auto">
                  <Badge text={selectedMission.status} />
                </div>
              </div>

              {/* Mission Info Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Mission Title</label>
                  <p className="mt-1 text-gray-900 font-medium">{selectedMission.missionTitle}</p>
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Location</label>
                  <p className="mt-1 text-gray-900 font-medium flex items-center gap-2">
                    <FiMapPin className="text-gray-400" /> {selectedMission.location}
                  </p>
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Start Date</label>
                  <p className="mt-1 text-gray-900 font-medium flex items-center gap-2">
                    <FiCalendar className="text-gray-400" /> {new Date(selectedMission.startDate).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">End Date</label>
                  <p className="mt-1 text-gray-900 font-medium flex items-center gap-2">
                    <FiCalendar className="text-gray-400" /> {new Date(selectedMission.endDate).toLocaleDateString()}
                  </p>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Description</label>
                <div className="mt-2 p-4 bg-gray-50 rounded-lg border border-gray-200 text-gray-700 text-sm leading-relaxed">
                  {selectedMission.description || "No description provided."}
                </div>
              </div>
            </div>

            {/* Modal Footer / Actions */}
            <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex justify-end gap-3">
              <button
                onClick={() => setSelectedMission(null)}
                className="px-4 py-2 text-gray-700 font-medium hover:bg-gray-200 rounded-lg transition-colors"
              >
                Close
              </button>

              {selectedMission.status === "pending" && (
                <>
                  <button
                    onClick={() => updateStatus(selectedMission.id, "Reject")}
                    disabled={actionLoading}
                    className="px-4 py-2 bg-red-100 text-red-700 font-medium hover:bg-red-200 rounded-lg transition-colors flex items-center gap-2"
                  >
                    {actionLoading ? "Processing..." : <><FiX /> Reject</>}
                  </button>
                  <button
                    onClick={() => updateStatus(selectedMission.id, "Approve")}
                    disabled={actionLoading}
                    className="px-4 py-2 bg-green-600 text-white font-medium hover:bg-green-700 rounded-lg transition-colors flex items-center gap-2 shadow-sm"
                  >
                    {actionLoading ? "Processing..." : <><FiCheck /> Approve</>}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllMission;
