import React, { useState } from "react";

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
            <div className="w-[1400px]">
                <HeaderFin />
            </div>
            <div className={`flex gap-70 mt-20 ${twTheme("bg-[#E6EAF5]", "bg-gray-900")}`}>
                <FinanceSidebar />

                <main className={`min-h-screen ${twTheme("", "bg-gray-900")}`}>
                    <div className="">
                        <Budget />
                    </div>
                    <div className="flex gap-10  ">

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
                    <div className="grid grid-cols-2  mt-10">
                        <div className="">
                            <MissionStatusList />
                        </div>
                        <div className="b w-[522px] rounded-2xl">
                            <AIAnalytics />
                        </div>
                    </div>
                    <div className="mt-10">
                        <ExpenseComparison/>
                    </div>


                </main>
            </div>
        </>
    );
};

export default FinanceDashboard;
