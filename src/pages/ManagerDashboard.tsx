
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
   <div className="bg-gray-100">
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
          <div className="mb-6 mt-5 mr-5">
            <div className="bg-gradient-to-r mb-5 ml-4 from-primaryColor-10 to-accent-10 p-3 rounded-lg shadow">
              <h1 className={`font-bold ${twTheme("text-black", "text-white")}`}>
                Here's your mission request overview
              </h1>
            </div>
            <MissionOverview />
          </div>

          {/* Grid Sections */}
          <div className="flex gap-10">
            {/* <div className="flex bg-accent-300 gap-4 w-f p-5 ml-0"> */}
            <div className="w-[445px] ml-4">
              <RecentActivities />
            </div>
            <div className=" w-[445px]">
              <QuickLinks />
            </div>

            {/* </div> */}
            <div className="grid w-[350px]">

              <div>
                <OngoingMissions />
              </div>
              <div>
                <MissionProgress />
              </div>
            </div>
          </div>

          {/* Charts Section */}
{/* <<<<<<<< HEAD:src/pages/ManagerDashboard.tsx
         

========
          <div className="flex mt-10 gap-6 flex-1">
            <div className="w-full  p-4 ">
              <AnnualMissionStatuses />
            </div>
            <div className="w-[500] p-4">
              <ThisMonthChart />
            </div>
            <div className="w-full p-4">
              <ExpensesChart />
            </div> */}
{/* >>>>>>>> fd715313abe03d770ac7cade63803af858660882:src/pages/Dashboard.tsx */}

        </main>
      </div>
    </>
   </div>
  );
};
{/* =======
import React from 'react'
import Header from '../Components/HeaderDash';
import ManagerSideBar from '../manager/ManagerSideBar';

const ManagerDashboard:React.FC = () => {
  return (
    <div className=''>
     <div>
         <Header/>
     <ManagerSideBar/>
     </div>
<main>
    <div className='ml-70 '> 
    <p className='text-black font-bold mt-20'>Manage your team members and their status</p>
    </div>
</main>
    </div>
  )
}
>>>>>>> fd715313abe03d770ac7cade63803af858660882 */}

export default ManagerDashboard;
