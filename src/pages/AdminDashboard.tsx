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
                    <div className="flex gap-10git">
                        <div className="grid grid-cols-2 gap-10 w-[800px]">
                            <div className="w-[400px]">
                                <RegistrationChart />
                            </div>
                            <div className="w-[400px]">
                                <ActivityChart />
                            </div>
                            <div className="w-[400px]">
                                <PendingActions />
                            </div>
                            <div className="w-[400px]">
                                <RecentActivity />
                            </div>


                        </div>
                        <div>
                            <Summary />
                        </div>
                    </div>

                </main>
            </div>
        </>
    );
};

export default AdminDashboard;
