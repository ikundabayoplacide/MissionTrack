import React from "react";
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

const EmployeeHome: React.FC = () => {
    return (
           <main className={`min-h-screen ${twTheme("", "bg-gray-900")}`}>
            {/* Overview */}
            <div className="flex gap-10">
                <div className="mb-5 bg-gradient-to-r from-primaryColor-10 to-accent-10 p-3 w-full justify-center items-center flex rounded-lg shadow">
                    <h1 className={`font-bold text-xl ${twTheme("text-black", "text-white")}`}>
                        Here's your mission request overview
                    </h1>
                </div>
            </div>
            <div className="flex gap-10 flex-col">
                <MissionOverview />
                {/* Grid Sections */}
                <div className="flex gap-10">
                    <div>
                        <RecentActivities />
                    </div>
                    <div>
                        <QuickLinks />
                    </div>
                    <div className="grid">
                        <div className="w-[250px]">
                            <OngoingMissions />
                        </div>
                        <div>
                            <MissionProgress />
                        </div>
                    </div>
                </div>

                {/* Charts Section */}
                <div className="flex mt-10 gap-4">
                    <div className="w-[350px]">
                        <AnnualMissionStatuses />
                    </div>
                    <div className="w-[350px">
                        <ThisMonthChart />
                    </div>
                    <div className="w-[350px]">
                        <ExpensesChart />
                    </div>
                </div>
            </div>
        </main>
    );
};

export default EmployeeHome;