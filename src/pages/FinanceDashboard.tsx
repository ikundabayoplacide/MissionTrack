import React from "react";

import FinanceSidebar from "../Components/Finance/FinanceSidebar";
import Budget from "../Components/Finance/Budget";
import SpendingsChart from "../Components/Finance/Spendings";
import MissionTrends from "../Components/Finance/MissionTrends";
import BudgetAlerts from "../Components/Finance/BudgetAlerts";
import HeaderFin from "../Components/Finance/HeaderFin";
import MissionStatusList from "../Components/Finance/MissionStatusList";
import AIAnalytics from "../Components/Finance/AIanalytics";
import ExpenseComparison from "../Components/Finance/ExpenseComparison";



const twTheme = (light: string, dark: string) => `${light} dark:${dark}`;

const FinanceDashboard: React.FC = () => {


    return (
        <>
            <HeaderFin />
            <div className={`flex mt-20 min-h-[calc(100vh-5rem)] ${twTheme("bg-[#E6EAF5]", "bg-gray-900")}`}>
                <div className="hidden sm:block z-40">
                    <FinanceSidebar />
                </div>

                <main className={`flex-1 sm:ml-64 p-6 overflow-x-hidden ${twTheme("", "bg-gray-900")}`}>
                    <div className="">
                        <Budget />
                    </div>
                    <div className="flex flex-wrap gap-10">

                        <div className="w-[350px]">
                            <SpendingsChart />
                        </div>
                        <div className="w-[350px]">
                            <MissionTrends />
                        </div>

                        <div className="w-[280px]">
                            <BudgetAlerts />
                        </div>

                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-10">
                        <div className="">
                            <MissionStatusList />
                        </div>
                        <div className="rounded-2xl">
                            <AIAnalytics />
                        </div>
                    </div>
                    <div className="mt-10">
                        <ExpenseComparison />
                    </div>
                </main>
            </div>
        </>
    );
};

export default FinanceDashboard;
