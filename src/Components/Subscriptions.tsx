import React, { useState } from "react";
import Header from "./HeaderDash";
import AdminSidebar from "./AdminSidebar";
import Revenue from "./Revenue";
import Plans from "./Plans";



const twTheme = (light: string, dark: string) => `${light} dark:${dark}`;

const Subscriptions: React.FC = () => {
 

  return (
    <>
      <Header />
      <div className={`flex gap-70 mt-20 ${twTheme("bg-[#E6EAF5]", "bg-gray-900")}`}>
        <AdminSidebar />

        <main className={`min-h-screen ${twTheme("", "bg-gray-900")}`}>
          <Revenue/>
          <Plans/>
        
        </main>
      </div>
    </>
  );
};

export default Subscriptions;
