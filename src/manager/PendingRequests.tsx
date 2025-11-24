// components/PendingRequests.tsx
import React, { useEffect, useState } from "react";
import { MdOutlinePendingActions } from "react-icons/md";
import axios from "axios";

type PendingRequestsProps = {
  subtitle?: string;
  className?: string;
};

const PendingRequests: React.FC<PendingRequestsProps> = ({
  subtitle = "Awaiting approval",
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
      const pendingCount = res.data.data.filter(
        (mission: any) => mission.status === "pending"
      ).length;
      setCount(pendingCount);
    } catch (err) {
      console.error("Error fetching missions:", err);
    }
  };

  useEffect(() => {
    // Initial fetch
    fetchMissions();

    // Set interval to refresh every 10 seconds
    const interval = setInterval(fetchMissions, 10000);

    // Clean up interval on unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={`bg-white rounded-xl shadow p-4 flex items-center justify-between ${className}`}
      role="region"
      aria-label="Pending requests"
    >
      <div>
        <div className="flex gap-20">
          <p className="text-black font-bold text-xl">Pending Requests</p>
          <div>
            <MdOutlinePendingActions className="text-orange-600" size={20} />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mt-5">{count}</h2>
        <p className="text-lg mt-3">{subtitle}</p>
      </div>
    </div>
  );
};

export default PendingRequests;
