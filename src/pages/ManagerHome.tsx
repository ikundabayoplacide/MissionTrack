import React from "react";
import PendingRequests from "../manager/PendingRequests";
import ApprovedMissions from "../manager/ApprovedMissions";
import TotalSpend from "../manager/TotalSpend";
import MissionsInProgress from "../manager/MissionsInProgress";
import MissionPurpose from "../manager/chart/MissionPurpose";
import MissionsPerEmployee from "../manager/chart/MissionsPerEmployee";
import QuickLinks from "../manager/QuickLinks";
import RecentActivities from "../manager/RecentActivities";
import TeamMembers from "../manager/TeamMembers";

const ManagerHome: React.FC = () => {
  return (
    <>
    <div className="flex flex-col">
      {/* Header Section */}
      <div className=" mx-auto py-4 mt-5 px-6 bg-gradient-to-l from-accent-10 to-primaryColor-50 rounded-md shadow-sm">
        <h1 className="font-bold text-2xl">
          Hello Manager, Here’s Mission Requests Overview
        </h1>
      </div>

      {/* Main Dashboard */}
      <main className=" mx-auto py-6 px-4">
        {/* Top Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <PendingRequests />
          <ApprovedMissions />
          <MissionsInProgress />
          <TotalSpend />
        </div>

        {/* Charts + Team Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
          {/* Left: Charts & Quick Links */}
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
            <MissionPurpose />
            <MissionsPerEmployee />
            <QuickLinks />
            <RecentActivities />
          </div>

          {/* Right: Team Members */}
          <div>
            <TeamMembers />
          </div>
        </div>
      </main>
      </div>
    </>
  );
};

export default ManagerHome;
