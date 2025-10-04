import React, { useEffect } from "react";
import Header from "../Components/HeaderDash";
import Sidebar from "../Components/Dashboard/Sidebar";
import { Outlet, useLocation } from "react-router-dom";

const twTheme = (light: string, dark: string) => {
  return `${light} dark:${dark}`;
};

const Dashboard: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    console.log("Dashboard - Current path:", location.pathname);
  }, [location.pathname]);

  return (
    <>
      <Header />
      <div className={`flex mt-20 min-h-screen ${twTheme("bg-[#E6EAF5]", "bg-gray-900")}`}>
        <Sidebar />
        {/* Main content area with proper margin for sidebar */}
        <main className="flex-1 ml-64 p-6 overflow-y-auto">
          <Outlet/>
        </main>
      </div>
    </>
  );
};

export default Dashboard;