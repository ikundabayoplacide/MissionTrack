// components/ApprovedMissions.tsx
import React, { useEffect, useState } from "react";
import { FiCheckCircle } from "react-icons/fi";
import axios from "axios";

type ApprovedMissionsProps = {
  subtitle?: string;
  trend?: string;
  another?: string;
  className?: string;
};

const ApprovedMissions: React.FC<ApprovedMissionsProps> = ({
  subtitle = "Approved Missions",
  trend = "+16%",
  another = "vs Last month",
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

      const approvedStatuses = ["approved", "manager_approved"];
      const approvedCount = res.data.data.filter((mission: any) =>
        approvedStatuses.includes(mission.status)
      ).length;

      setCount(approvedCount);
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
      aria-label="Approved missions"
    >
      <div>
        <div className="flex gap-19">
          <p className="text-black font-bold text-xl">{subtitle}</p>
          <div className="text-green-600">
            <FiCheckCircle size={20} />
          </div>
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mt-5">{count}</h2>
        <p className="text-lg mt-3">
          <span className="text-green-600">{trend} </span>
          {another}
        </p>
      </div>
    </div>
  );
};

export default ApprovedMissions;
