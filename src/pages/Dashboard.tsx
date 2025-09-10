import React from "react";
import Header from "../Components/HeaderDash";
import Sidebar from "../Components/Sidebar";
// Import your components here
import MissionOverview from "../Components/MissionOverview";
import RecentActivities from "../Components/RecentActivities";
import QuickLinks from "../Components/QuickLinks";

// Example dark mode helper (if you want)
const twTheme = (light: string, dark: string) => {
  return `${light} dark:${dark}`;
};

const Dashboard: React.FC = () => {
  return (
    <>
      <Header />
      <div className="flex gap-6">
        <Sidebar />
        <main className="flex-1 p-6">
          {/* Overview */}
          <div className="mb-6">
            <h1 className={`font-bold mb-4 ${twTheme("text-black", "text-white")}`}>
              Here's your mission request overview
            </h1>
            <MissionOverview />
          </div>

          {/* Grid Sections */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <RecentActivities />
            <QuickLinks />
          </div>
        </main>
      </div>
    </>
  );
};

export default Dashboard;
