import React, { useEffect, useState } from "react";
import { useTheme } from "../../hook/useTheme";

type Mission = {
  id: string;
  missionTitle: string;
  status: "pending" | "in-progress" | "completed" | "rejected";
};

const OngoingMissions: React.FC = () => {
  const { theme } = useTheme();
  const [missions, setMissions] = useState<Mission[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMissions = async () => {
      try {
        const token = localStorage.getItem("token"); // ✅ saved token
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
          // ✅ Only ongoing missions (pending or in-progress)
          const ongoing = data.data.filter(
            (m: Mission) => m.status === "pending" || m.status === "in-progress"
          );
          setMissions(ongoing);
        }
      } catch (err) {
        console.error("Error fetching ongoing missions:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMissions();
  }, []);

  return (
    <div
      className={`rounded-xl shadow-sm p-5 ${theme === "light" ? "bg-white text-black" : "bg-gray-800 text-white"
        }`}
    >
      <h3 className="font-bold mb-4">Ongoing Missions</h3>

      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : missions.length === 0 ? (
        <p className="text-gray-500">No ongoing missions</p>
      ) : (
        <div className="space-y-3">
          {missions.map((mission) => (
            <div
              key={mission.id}
              className="flex items-center justify-between rounded-lg px-4 py-3"
            >
              {/* Title + colored dot */}
              <div className="flex items-center gap-3">
                <p className="font-medium">{mission.missionTitle}</p>
                <span
                  className={`w-3 h-3 rounded-full ${mission.status === "pending"
                      ? "bg-yellow-500"
                      : "bg-green-500"
                    }`}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OngoingMissions;
