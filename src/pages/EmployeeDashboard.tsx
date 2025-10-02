import React from "react";
import Header from "../Components/HeaderDash";
import Sidebar from "../Components/Dashboard/Sidebar";
import { Outlet } from "react-router-dom";

const twTheme = (light: string, dark: string) => {
  return `${light} dark:${dark}`;
};

const Dashboard: React.FC = () => {
  return (
    <>
      <Header />
      <div className={`flex  mt-20  ${twTheme("bg-[#E6EAF5]", "bg-gray-900")}`} >
        <div className="ml-70">
          <Sidebar />
        <Outlet/>
        </div>
        
      </div>
    </>
  );
};

export default Dashboard;
