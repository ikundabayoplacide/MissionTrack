import React from "react";
import Header from "../Components/HeaderDash";
import ManagerSideBar from "../manager/ManagerSideBar";
import { Outlet } from "react-router-dom";
// import PendingRequests from "../manager/PendingRequests";
// import ApprovedMissions from "../manager/ApprovedMissions";
// import TotalSpend from "../manager/TotalSpend";
// import MissionsInProgress from "../manager/MissionsInProgress";
// import MissionPurpose from "../manager/chart/MissionPurpose";
// import MissionsPerEmployee from "../manager/chart/MissionsPerEmployee";
// import QuickLinks from "../manager/QuickLinks";
// import RecentActivities from "../manager/RecentActivities";
// import TeamMembers from "../manager/TeamMembers";


const twTheme = (light: string, dark: string) => {
  return `${light} dark:${dark}`;
};

const ManagerDashboard: React.FC = () => {
  return (
    <>
      <Header />
      <div className={`flex gap-70 mt-20  ${twTheme("bg-[#E6EAF5]", "bg-gray-900")}`} >
        <ManagerSideBar />
        <Outlet/>
      
      </div>
    </>
    
  );
};

export default ManagerDashboard;
