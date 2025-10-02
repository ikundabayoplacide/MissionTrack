// pages/AllMission.tsx
import React, { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import axios from "axios";
import MissionTable from "../manager/ManagerTable";

const twTheme = (light: string, dark: string) => `${light} dark:${dark}`;

const AllMission: React.FC = () => {
  const [missions, setMissions] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [loading, setLoading] = useState(true);

  const statusOptions = [
    "All Status",
    "pending",
    "manager_approved",
    "inProgress",
    "rejected",
  ];

  // Fetch missions from backend
  const fetchMissions = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        "https://missiontrack-backend.onrender.com/api/missions/manager",
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

  

  // Map API missions into consistent structure
  const mappedMissions = missions.map((m) => ({
    id: m.id,
    missionName: m.missionTitle || "N/A",
    email: m.email || "N/A",
    status: m.status || "N/A",
    plan: m.jobPosition || "N/A",
    manager: m.fullName || "N/A",
    payment: m.paymentStatus || "N/A",
    lastActivity: m.updatedAt
      ? new Date(m.updatedAt).toLocaleDateString()
      : "N/A",
    description: m.description || "No description provided",
    startDate: m.startDate ? new Date(m.startDate).toLocaleDateString() : "N/A",
    endDate: m.endDate ? new Date(m.endDate).toLocaleDateString() : "N/A",
  }));

  // Filter and search after mapping
  const filteredMissions = mappedMissions.filter((m) => {
    const query = searchQuery.toLowerCase();

    const matchesSearch =
      m.missionName.toLowerCase().includes(query) ||
      m.manager.toLowerCase().includes(query) ||
      m.plan.toLowerCase().includes(query);

    const matchesStatus =
      statusFilter === "All Status" ||
      m.status.toLowerCase() === statusFilter.toLowerCase();

    return matchesSearch && matchesStatus;
  });

  return (
    <>
     

        <main className={`min-h-screen ${twTheme("", "bg-gray-900")}`}>
          <div className="w-[1050px] bg-white rounded-2xl mt-2 overflow-x-auto">
            {/* Search + Filter */}
            <div className="flex flex-col sm:flex-row gap-2 items-center justify-center p-4">
              {/* Search Input */}
              <div className="flex-1 w-full sm:w-auto flex gap-2 items-center bg-white rounded-xl border border-gray-300 shadow-sm py-1 mb-2 sm:mb-0 px-2">
                <FiSearch className="text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-8 text-gray-700 placeholder-gray-400 focus:outline-none"
                  placeholder="Search by title, manager, or job position"
                />
              </div>

              {/* Status Filter Dropdown */}
              <div className="relative">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-4 py-2 rounded-xl border border-gray-300 shadow-sm bg-white cursor-pointer text-gray-700"
                >
                  {statusOptions.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Missions Table */}
            {loading ? (
              <p className="text-gray-500 p-4">Loading missions...</p>
            ) : (
              <MissionTable data={filteredMissions} />
            )}
          </div>
        </main>
      
    </>
  );
};

export default AllMission;
