import React from "react";
import Header from "../Components/HeaderDash";
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
    <>
      <Header />
      <div className="flex gap-70 ">
        <ManagerSideBar />
        <div className=" mt-20 ">
          <div className="  w-[1050px] py-2 mt-5 bg-gradient-to-l from-accent-10 rounded-md to-primaryColor-50">
            <h1 className="font-bold text-2xl">
              Hello Manager, Here’s Mission Requests Overview
            </h1>
          </div>
          <main className="py-6  w-[1050px]">
            <div className="">


              <div className="grid grid-cols-1  md:grid-cols-4 gap-6">
                <PendingRequests />
                <ApprovedMissions />
                <MissionsInProgress />
                <TotalSpend />
              </div>
              <div className="flex   gap-9">

                <div className="grid  grid-cols-1 md:grid-cols-2 gap-10 mt-6">
                  <MissionPurpose />
                  <MissionsPerEmployee />
                  <QuickLinks />
                  <RecentActivities />
                </div>
                <div className="mt-6">
                  <TeamMembers />
                </div>
              </div>

            </div>
          </main>
        </div>
      </div>
    </>
    // <div className=" mt-20 flex bg-[#E6EAF5] min-h-screen ">
    //   
    //   

    //   {/* Main Content */}
    //   <div className="flex  ml-30">
    // 


    //   </div>
    // </div>
  );
};

export default ManagerDashboard;
