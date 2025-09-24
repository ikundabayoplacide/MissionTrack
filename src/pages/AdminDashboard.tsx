import React, { useState } from "react";

import AdminSidebar from "../Components/Admin/AdminSidebar";
import TopCard from "../Components/Admin/TopCard";
import RegistrationChart from "../Components/Admin/RegistrationChart";
import ActivityChart from "../Components/Admin/ActivityChart";
import PendingActions from "../Components/Admin/PendingAction";
import RecentActivity from "../Components/RecentActivity";
import Summary from "../Components/Admin/Summary";
import HeaderAdmin from "../Components/Admin/HeaderAdmin";

const twTheme = (light: string, dark: string) => `${light} dark:${dark}`;

const AdminDashboard: React.FC = () => {


    return (
        <>
            <HeaderAdmin />
            <div className={`flex gap-70 mt-20 ${twTheme("bg-[#E6EAF5]", "bg-gray-900")}`}>
                <AdminSidebar />

                <main className={`min-h-screen ${twTheme("", "bg-gray-900")}`}>
                    <TopCard />
                    <div className="flex gap-10">
                        <div className="grid grid-cols-2 mt-4 gap-10 ">
                            <div className="w-[380px]">
                                <RegistrationChart />
                            </div>
                            <div className="w-[380px]">
                                <ActivityChart />
                            </div>
                            <div className="w-[380px]">
                                <PendingActions />
                            </div>
                            <div className="w-[380px]">
                                <RecentActivity />
                            </div>


                        </div>
                        <div className=" ">
                            <Summary />
                        </div>
                    </div>

                </main>
            </div>
        </>
    );
};

export default AdminDashboard;
