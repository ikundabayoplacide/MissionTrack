import React, { useEffect, useState } from "react";
import { ClipboardList, CheckCircle, Clock, XCircle } from "lucide-react";
import OverviewCard from "./OverviewCard";

type Mission = {
  id: string;
  missionTitle: string;
  status: "approved" | "pending" | "rejected" | "manager_approved";
};

const MissionOverview: React.FC = () => {
  const [missions, setMissions] = useState<Mission[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMissions = async () => {
      try {
        const token = localStorage.getItem("token"); // ✅ your saved token
        const res = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/missions/employee`,
          {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await res.json();
        if (data.success) {
          setMissions(data.data);
        }
      } catch (error) {
        console.error("Error fetching missions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMissions();
  }, []);

  // ✅ Approved statuses can be multiple now
  const approvedStatuses = ["approved", "manager_approved"];

  const allMissions = missions.length;
  const completed = missions.filter((m) => approvedStatuses.includes(m.status)).length;
  const pending = missions.filter((m) => m.status === "pending").length;
  const rejected = missions.filter((m) => m.status === "rejected").length;

  const stats = [
    {
      title: "All Missions",
      value: allMissions,
      color: "text-blue-600",
      icon: ClipboardList,
    },
    {
      title: "Approved",
      value: completed,
      color: "text-green-600",
      icon: CheckCircle,
    },
    {
      title: "Pending",
      value: pending,
      color: "text-yellow-600",
      icon: Clock,
    },
    {
      title: "Rejected",
      value: rejected,
      color: "text-red-600",
      icon: XCircle,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6 ml-4">
      {loading ? (
        <p className="col-span-4 text-center text-gray-500">Loading...</p>
      ) : (
        stats.map((stat, index) => (
          <OverviewCard
            key={index}
            title={stat.title}
            value={stat.value}
            color={stat.color}
            icon={stat.icon}
          />
        ))
      )}
    </div>
  );
};

export default MissionOverview;
