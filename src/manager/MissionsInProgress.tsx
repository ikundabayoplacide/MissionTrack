// components/MissionsInProgress.tsx
import React, { useEffect, useState } from "react";
import { FiClock } from "react-icons/fi";
import axios from "axios";

type MissionsInProgressProps = {
  subtitle?: string;
  trend?: string;
  className?: string;
};

const MissionsInProgress: React.FC<MissionsInProgressProps> = ({
  subtitle = "Missions in Progress",
  trend = "Active Mission",
  className = "",
}) => {
  const [count, setCount] = useState(0);

  const fetchMissions = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/missions/manager`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const inProgressCount = res.data.data.filter(
        (mission: any) => mission.status === "inProgress"
      ).length;
      setCount(inProgressCount);
    } catch (err) {
      console.error("Error fetching missions:", err);
    }
  };

  useEffect(() => {
    // Initial fetch
    fetchMissions();

    // Refresh every 10 seconds
    const interval = setInterval(fetchMissions, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={`bg-white rounded-xl shadow p-4 flex items-center justify-between ${className}`}
      role="region"
      aria-label="Missions in progress"
    >
      <div>
        <div className="flex gap-19">
          <p className="text-lg font-bold">{subtitle}</p>
          <div>
            <FiClock className="text-blue-600" size={20} />
          </div>
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mt-5">{count}</h2>
        <p className="text-lg mt-3">{trend}</p>
      </div>
    </div>
  );
};

export default MissionsInProgress;
