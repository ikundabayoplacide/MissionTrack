import React from "react";
import Header from "../Components/EmployeeDashboard/HeaderDash";
import ManagerSideBar from "../manager/ManagerSideBar";
import PendingRequests from "../manager/PendingRequests";
import ApprovedMissions from "../manager/ApprovedMissions";
import TotalSpend from "../manager/TotalSpend";
import MissionsInProgress from "../manager/MissionsInProgress";
import MissionPurpose from "../manager/chart/MissionPurpose";
import MissionsPerEmployee from "../manager/chart/MissionsPerEmployee";
import QuickLinks from "../manager/QuickLinks";
import RecentActivities from "../manager/RecentActivities";
import TeamMembers from "../manager/TeamMembers";

const ManagerDashboard: React.FC = () => {
  return (
    <div className=" mt-20 flex bg-gray-100 min-h-screen ">
      {/* Sidebar */}
      <ManagerSideBar />

      {/* Main Content */}
      <div className="flex ml-80 ">
        <Header />
        
        <main className="p-6 ">
          <div className="bg-gradient-to-r  from-primaryColor-100 to-accent-10 text-black p-2 rounded-xl mb-3">
            <h1 className="font-bold text-xl ml-2">Hello Manager, Here's Mission Requests Overview </h1>
          </div>
          <div className="grid grid-cols-1    md:grid-cols-4 gap-6">
            <PendingRequests />
            <ApprovedMissions />
            <MissionsInProgress/>
            <TotalSpend />
          </div>
          <div className="flex  w-[1390px] gap-9">

            <div className="grid  grid-cols-1 w-[1100px] md:grid-cols-2 gap-10 mt-6">
            <MissionPurpose/>
            <MissionsPerEmployee/>
            <QuickLinks/>
            <RecentActivities/>
          </div>
          <div className="mt-6">
            <TeamMembers/>
          </div>
          </div>
          
        </main>
      </div>
    </div>
  );
};

export default ManagerDashboard;
