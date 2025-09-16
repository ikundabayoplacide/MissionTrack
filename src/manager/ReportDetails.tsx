// src/pages/MissionDetails.tsx
import React from "react";
import { useParams } from "react-router-dom";
import { BsClock } from "react-icons/bs";
import Header from "../Components/HeaderDash";
import ManagerSideBar from "./ManagerSideBar";
ManagerSideBar

const activities = [
  { date: "June 15, 2025", time: "08:00", description: "Feedback session" },
  { date: "June 14, 2025", time: "14:00", description: "Feedback session" },
  { date: "June 13, 2025", time: "14:00", description: "Data collection and survey distribution" },
  { date: "June 12, 2025", time: "12:00", description: "Purchased Research Materials" },
  { date: "June 12, 2025", time: "14:00", description: "Project kickoff meeting with stakeholder" },
];

const ReportDetails: React.FC = () => {
  const { id } = useParams();

  return (
    <>
    <Header/>
    <div className="">
        <ManagerSideBar/>

    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">Mission #{id} - Daily Activities</h2>
      <div className="divide-y divide-gray-200">
        {activities.map((activity, index) => (
          <div key={index} className="py-4">
            <div className="flex justify-between text-gray-600">
              <span className="font-semibold text-gray-900">{activity.date}</span>
              <span className="ml-2 font-medium">{activity.time}</span>
            </div>
            <p className="mt-1 text-gray-700">{activity.description}</p>
          </div>
        ))}
      </div>
    </div>
    </div>
    </>
  );
};

export default ReportDetails;
