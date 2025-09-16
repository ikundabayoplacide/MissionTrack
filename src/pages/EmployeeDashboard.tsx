import React from "react";
import Header from "../Components/HeaderDash";
import Sidebar from "../Components/Dashboard/Sidebar";
import MissionOverview from "../Components/MissionOverview";
import RecentActivities from "../Components/RecentActivities";
import QuickLinks from "../Components/Dashboard/QuickLinks";
import AnnualMissionStatuses from "../chart/AnnualMissionStatuses";
import ThisMonthChart from "../chart/ThisMonthChart";
import ExpensesChart from "../chart/ExpensesChart";
import MissionProgress from "../Components/Dashboard/MissionProgress";
import OngoingMissions from "../Components/Dashboard/OngoingMissions";

const twTheme = (light: string, dark: string) => {
  return `${light} dark:${dark}`;
};

const Dashboard: React.FC = () => {
  return (
    <>
      <Header />
      <div className={`flex gap-70 mt-20  ${twTheme("bg-[#E6EAF5]", "bg-gray-900")}`} >
        <Sidebar />
        <main
          className={`min-h-screen   ${twTheme(
            "",
            "bg-gray-900"
          )}`}
        >
          {/* Overview */}
          <div className="mb-6 mt-5">
            <div className=" mb-5 ml-4 bg-gradient-to-r from-primaryColor-10 to-accent-10 p-3 rounded-lg shadow">
              <h1 className={`font-bold ${twTheme("text-black", "text-white")}`}>
                Here's your mission request overview
              </h1>
            </div>
            <MissionOverview />
          </div>

          {/* Grid Sections */}
          <div className="flex   gap-10 ">
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
          <div className="flex mt-10 gap-6 flex-1">
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
        </main>
      </div>
    </>
  );
};

export default Dashboard;
