import React, { useEffect, useState } from "react";

type Mission = {
  id: string;
  missionTitle: string;
  fullName: string;
  jobPosition: string;
  location: string;
  startDate: string;
  endDate: string;
  missionDescription: string;
  documents: string[]; // file URLs from backend
  status: string;
};

const MissionReview: React.FC = () => {
  const [missions, setMissions] = useState<Mission[]>([]);
  const [selectedMission, setSelectedMission] = useState<Mission | null>(null);

  useEffect(() => {
    const fetchMissions = async () => {
      const token = localStorage.getItem("token");
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/missions`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setMissions(data);
    };
    fetchMissions();
  }, []);

  const updateStatus = async (missionId: string, newStatus: string) => {
    try {
      const token = localStorage.getItem("token");
      await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/missions/${missionId}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status: newStatus }),
        }
      );
      setMissions((prev) =>
        prev.map((m) => (m.id === missionId ? { ...m, status: newStatus } : m))
      );
      setSelectedMission(null);
    } catch (err) {
      console.error("❌ Failed to update mission", err);
    }
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow">
      <h1 className="text-2xl font-bold mb-4">Pending Missions</h1>
      <table className="w-full text-left border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2">Mission Title</th>
            <th className="p-2">Employee</th>
            <th className="p-2">Job Position</th>
            <th className="p-2">Destination</th>
            <th className="p-2">Dates</th>
            <th className="p-2">Status</th>
            <th className="p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {missions.map((m) => (
            <tr key={m.id} className="border-t">
              <td className="p-2">{m.missionTitle}</td>
              <td className="p-2">{m.fullName}</td>
              <td className="p-2">{m.jobPosition}</td>
              <td className="p-2">{m.location}</td>
              <td className="p-2">
                {m.startDate} → {m.endDate}
              </td>
              <td className="p-2">{m.status}</td>
              <td className="p-2">
                <button
                  className="text-blue-500 underline"
                  onClick={() => setSelectedMission(m)}
                >
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal */}
      {selectedMission && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="bg-white p-6 rounded-md w-2/3">
            <h2 className="text-xl font-bold mb-3">{selectedMission.missionTitle}</h2>
            <p><strong>Employee:</strong> {selectedMission.fullName}</p>
            <p><strong>Position:</strong> {selectedMission.jobPosition}</p>
            <p><strong>Destination:</strong> {selectedMission.location}</p>
            <p><strong>Dates:</strong> {selectedMission.startDate} → {selectedMission.endDate}</p>
            <p><strong>Description:</strong> {selectedMission.missionDescription}</p>

            <div className="mt-3">
              <strong>Documents:</strong>
              <ul className="list-disc list-inside">
                {selectedMission.documents?.map((doc, idx) => (
                  <li key={idx}>
                    <a href={doc} target="_blank" rel="noreferrer" className="text-blue-600 underline">
                      {doc}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              {selectedMission.status === "pending" && (
                <>
                  <button
                    onClick={() => updateStatus(selectedMission.id, "approved")}
                    className="px-4 py-2 bg-green-600 text-white rounded"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => updateStatus(selectedMission.id, "rejected")}
                    className="px-4 py-2 bg-red-600 text-white rounded"
                  >
                    Reject
                  </button>
                </>
              )}
              <button
                onClick={() => setSelectedMission(null)}
                className="px-4 py-2 bg-gray-400 text-white rounded"
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

export default MissionReview;
