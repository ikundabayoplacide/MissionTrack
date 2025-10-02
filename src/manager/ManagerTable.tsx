// components/MissionTable.tsx
import React, { useEffect, useState } from "react";
import axios from "axios";

// Badge component
const Badge = ({ text }: { text: string }) => {
  const getColorClasses = (status: string) => {
    switch (status.toLowerCase()) {
      case "approved":
        return "bg-green-100 text-green-600";
      case "pending":
        return "bg-yellow-100 text-yellow-600";
      case "inprogress":
        return "bg-blue-100 text-blue-600";
      case "rejected":
        return "bg-red-100 text-red-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <span
      className={`px-2 py-1 inline-block rounded-full font-medium text-xs ${getColorClasses(
        text
      )}`}
    >
      {text}
    </span>
  );
};

type Mission = {
  id: string;
  missionName: string;
  email: string;
  status: string;
  plan: string;
  manager: string;
  lastActivity: string;
  description?: string;
  startDate?: string;
  endDate?: string;
};

type MissionTableProps = {
  data: Mission[];
};

const MissionTable: React.FC<MissionTableProps> = ({ data }) => {
  const [missions, setMissions] = useState<Mission[]>([]);
  const [selectedMission, setSelectedMission] = useState<Mission | null>(null);

  useEffect(() => {
    setMissions(data);
  }, [data]);

  const updateStatus = async (
    missionId: string,
    action: "Approve" | "Reject"
  ) => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "https://missiontrack-backend.onrender.com/api/actions/create",
        {
          missionId,
          action,
          comment: `${action}d by manager`, // optional
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // update local state immediately
      setMissions((prev) =>
        prev.map((m) =>
          m.id === missionId ? { ...m, status: action.toLowerCase() } : m
        )
      );
      setSelectedMission(null);
    } catch (err) {
      console.error("Error updating mission status:", err);
      alert("Failed to update mission status");
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden  w-full">
      {/* Table Header */}
      <div className="grid grid-cols-7 gap-4 text-sm font-semibold text-gray-600 bg-gray-50 p-4">
        <div>Mission Title</div>
        <div>Status</div>
        <div>Job Position</div>
        <div>Manager</div>
        <div>Last Activity</div>
        <div>Actions</div>
      </div>

      {/* Table Rows */}
      {missions.length > 0 ? (
        missions.map((m) => (
          <div
            key={m.id}
            className="grid grid-cols-7 gap-4 items-center text-sm border-b border-gray-200 p-4 last:border-b-0"
          >
            <div className="font-semibold text-gray-800">{m.missionName}</div>
            <div>
              <Badge text={m.status} />
            </div>
            <div className="text-gray-700">{m.plan}</div>
            <div className="text-gray-700">{m.manager}</div>
            <div className="text-gray-700">{m.lastActivity}</div>
            <div className="flex gap-2 justify-center">
              <button
                onClick={() => setSelectedMission(m)}
                className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-xs"
              >
                View
              </button>
            </div>
          </div>
        ))
      ) : (
        <div className="text-center text-gray-500 italic py-6">
          No missions found
        </div>
      )}

      {/* Modal for Viewing Details */}
      {selectedMission && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-[500px] max-w-full">
            <h2 className="text-lg font-semibold mb-4">
              Mission Request Details
            </h2>
            <p>
              <strong>Title:</strong> {selectedMission.missionName}
            </p>
            <p>
              <strong>Email:</strong> {selectedMission.email}
            </p>
            <p>
              <strong>Manager:</strong> {selectedMission.manager}
            </p>
            <p>
              <strong>Job Position:</strong> {selectedMission.plan}
            </p>
            <p>
              <strong>Status:</strong> {selectedMission.status}
            </p>
            <p>
              <strong>Last Activity:</strong> {selectedMission.lastActivity}
            </p>
            {selectedMission.description && (
              <p>
                <strong>Description:</strong> {selectedMission.description}
              </p>
            )}
            {selectedMission.startDate && (
              <p>
                <strong>Start Date:</strong> {selectedMission.startDate}
              </p>
            )}
            {selectedMission.endDate && (
              <p>
                <strong>End Date:</strong> {selectedMission.endDate}
              </p>
            )}

            <div className="mt-6 flex gap-2 justify-end">
              {selectedMission.status === "pending" ? (
                <>
                  <button
                    onClick={() => updateStatus(selectedMission.id, "Approve")}
                    className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 text-sm"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => updateStatus(selectedMission.id, "Reject")}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
                  >
                    Reject
                  </button>
                </>
              ) : (
                <span className="text-gray-500 text-sm">Already Reviewed</span>
              )}
              <button
                onClick={() => setSelectedMission(null)}
                className="px-3 py-1 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 text-sm"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MissionTable;
