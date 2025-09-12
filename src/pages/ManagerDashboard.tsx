import React from "react";
import Header from "../Components/HeaderDash";
import SidebarManager from "../Components/SidebarManager";
import MissionOverview from "../Components/MissionOverview";
import RecentActivities from "../Components/RecentActivities";
import QuickLinks from "../Components/QuickLinks";

import MissionProgress from "../Components/MissionProgress";
import OngoingMissions from "../Components/OngoingMissions";

const twTheme = (light: string, dark: string) => {
  return `${light} dark:${dark}`;
};

const ManagerDashboard: React.FC = () => {
  return (
    <>
      <Header />
      <div className={`flex gap-70 mt-20  ${twTheme("bg-gray-100", "bg-gray-900")}`} >
        <SidebarManager />
        <main
          className={`min-h-screen   ${twTheme(
            "",
            "bg-gray-900"
          )}`}
        >
          {/* Overview */}
          <div className="mb-6 mt-5">
            <div className="bg-gradient-to-r mb-5 ml-4 from-primaryColor-10 to-accent-10 p-3 rounded-lg shadow">
              <h1 className={`font-bold ${twTheme("text-black", "text-white")}`}>
                Here's your mission request overview
              </h1>
            </div>
            <MissionOverview />
          </div>

          {/* Grid Sections */}
          <div className="flex gap-10 ">
            {/* <div className="flex bg-accent-300 gap-4 w-f p-5 ml-0"> */}
            <div className="w-[400px]">
              <RecentActivities />
            </div>
            <div className=" w-[400px]">
              <QuickLinks />
            </div>

            {/* </div> */}
            <div className="grid ">

              <div>
                <OngoingMissions />
              </div>
              <div>
                <MissionProgress />
              </div>
            </div>
          </div>

          {/* Charts Section */}
         


        </main>
      </div>
    </>
  );
};

export default ManagerDashboard;
