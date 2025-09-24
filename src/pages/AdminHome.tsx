import React, { useState } from "react";
import TopCard from "../Components/Admin/TopCard";
import RegistrationChart from "../Components/Admin/RegistrationChart";
import ActivityChart from "../Components/Admin/ActivityChart";
import PendingActions from "../Components/Admin/PendingAction";
import RecentActivity from "../Components/RecentActivity";
import Summary from "../Components/Admin/Summary";



const twTheme = (light: string, dark: string) => `${light} dark:${dark}`;

const AdminHome: React.FC = () => {
    return(

<main className={`min-h-screen ${twTheme("", "bg-gray-900")}`}>
    <TopCard />
    <div className="flex gap-10">
        <div className="grid grid-cols-2 mt-4 gap-10 ">
            <div className="w-[350px]">
                <RegistrationChart />
            </div>
            <div className="w-[350px]">
                <ActivityChart />
            </div>
            <div className="w-[350px]">
                <PendingActions />
            </div>
            <div className="w-[350px] ">
                <RecentActivity />
            </div>


        </div>
        <div className=" ">
            <Summary />
        </div>
    </div>

</main>
)};
export default AdminHome;