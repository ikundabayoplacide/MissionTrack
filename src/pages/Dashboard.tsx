import React from "react";
import Header from "../Components/HeaderDash";
import Sidebar from "../Components/Sidebar";
import MissionOverview from "../Components/MissionOverview";
import RecentActivities from "../Components/RecentActivities";
import QuickLinks from "../Components/QuickLinks";
import AnnualMissionStatuses from "../chart/AnnualMissionStatuses";
import ThisMonthChart from "../chart/ThisMonthChart";
import ExpensesChart from "../chart/ExpensesChart";
import MissionProgress from "../Components/MissionProgress";
import OngoingMissions from "../Components/OngoingMissions";

const twTheme = (light: string, dark: string) => {
  return `${light} dark:${dark}`;
};

const Dashboard: React.FC = () => {
  return (
    <>
      <Header />
      <div className={`flex gap-6  ${twTheme("bg-gray-100", "bg-gray-900")}`} >
        <Sidebar />
        <main
          className={`flex-1 p-6 left-20 mt-20 ml-72 mr-12 min-h-screen ${twTheme(
            "bg-gray-100",
            "bg-gray-900"
          )}`}
        >
          {/* Overview */}
          <div className="mb-6">
            <div className="bg-gradient-to-r mb-5 ml-4 from-blue-400 to-green-300 p-3 rounded-lg shadow">
              <h1 className={`font-bold ${twTheme("text-black", "text-white")}`}>
                Here's your mission request overview
              </h1>
            </div>
            <MissionOverview />
          </div>

          {/* Grid Sections */}
         <div className="flex ">
           <div className="flex gap-4 w-f p-5 ml-0">
            <RecentActivities />
            <div className="w-120">
              <QuickLinks />
            </div>
            
          </div>
          <div className="grid mt-6">
              
            <div>
              <OngoingMissions/>
            </div>
            <div>
              <MissionProgress/>
            </div>
            </div>
         </div>

          {/* Charts Section */}
          <div className="flex mt-10 gap-6 flex-wrap">
            <div className="flex gap-6 flex-1">
              <div className="w-full  p-4">
                <AnnualMissionStatuses />
              </div>
              <div className="w-full p-4">
                <ThisMonthChart />
              </div>
              <div className="w-full p-4">
              <ExpensesChart />
            </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default Dashboard;
