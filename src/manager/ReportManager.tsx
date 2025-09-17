import React, { useState } from "react";

import { FiSearch } from "react-icons/fi";
import Header from "../Components/HeaderDash";
import ManagerSideBar from "./ManagerSideBar";
import { BsCalendar2Event } from "react-icons/bs";
import { FiUser } from "react-icons/fi";



import { MdOutlineRemoveRedEye } from "react-icons/md";


const ReportManager: React.FC = () => {

    // Example data
    const missions = [
        {
            id: 1,
            title: "Market Research - Q4 Analysis",
            manager: "Sarah Johnson",
            dateRange: "Jan 12 - June 12",
            budgetUsed: 410000,
            totalBudget: 800000,
            status: "Ongoing",
        },
        {
            id: 2,
            title: "Customer Satisfaction Survey",
            manager: "Michael Brown",
            dateRange: "Feb 01 - July 30",
            budgetUsed: 200000,
            totalBudget: 500000,
            status: "Ongoing",
        },
        {
            id: 3,
            title: "Product Launch Campaign",
            manager: "Anna Smith",
            dateRange: "Mar 10 - Aug 15",
            budgetUsed: 800000,
            totalBudget: 800000,
            status: "Completed",
        },
    ];


    return (
        <>
            <Header />
            <div className="flex gap-80 min-h-screen  bg-[#E6EAF5] mt-20">
                <ManagerSideBar />
                <div className="flex flex-col">
                    <div className="w-[1200px] py-2 mt-5 bg-gradient-to-l from-accent-10 rounded-md to-primaryColor-50">
                        <h1 className="font-bold text-2xl text-center">Your Missions</h1>
                    </div>
                    <div className="grid grid-cols-3 mt-5 gap-2">

                        <div className="rounded-lg border border-gray-200 bg-white p-4 shadow">
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium text-gray-500">Total missions</span>
                                <span className="text-sm font-medium text-gray-500">Active</span>
                            </div>
                            <div className="mt-2 flex items-center justify-between">
                                <span className="text-2xl font-bold text-gray-900">6</span>
                                <span className="text-2xl font-bold text-orange-500">4</span>
                            </div>
                        </div>
                        <div className="rounded-lg border border-gray-200 bg-white p-4 shadow">
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium text-gray-500">Total Budget</span>
                                <span className="text-sm font-medium text-gray-500">Spent</span>
                            </div>
                            <div className="mt-2 flex items-center justify-between">
                                <span className="text-2xl font-bold text-gray-900">$ 110000</span>
                                <span className="text-2xl font-bold text-accent-500">$ 120,000</span>
                            </div>
                        </div>
                        <div className="rounded-lg border border-gray-200 bg-white p-4 shadow">
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium text-gray-500">Av.g  completion</span>
                                <span className="text-sm font-medium text-gray-500">Completed</span>
                            </div>
                            <div className="mt-2 flex items-center justify-between">
                                <span className="text-2xl font-bold text-gray-900">72 %</span>
                                <span className="text-2xl font-bold text-primaryColor-600">3</span>
                            </div>
                        </div>
                    </div>

                    {/* Missions List */}
                    <ul className="grid grid-cols-3 gap-[10px] mt-5 items-center w-full">
                        {missions.map((mission) => {
                            const progressPercentage = (mission.budgetUsed / mission.totalBudget) * 100;

                            return (
                                <li
                                    key={mission.id}
                                    className="flex w-full max-w-sm flex-col rounded-lg bg-white p-6 shadow-md"
                                >
                                    {/* Header Section */}
                                    <div className="flex items-start justify-between">
                                        <h2 className="text-xl font-bold text-gray-900">{mission.title}</h2>
                                        <span
                                            className={`rounded-full px-3 py-1 text-sm font-semibold ${mission.status === "Completed"
                                                    ? "bg-accent-600 text-white"
                                                    : "bg-orange-200 text-orange-800"
                                                }`}
                                        >
                                            {mission.status}
                                        </span>
                                    </div>

                                    {/* Details */}
                                    <div className="mt-4 space-y-2 text-gray-600">
                                        <div className="flex gap-2 items-center">
                                            <FiUser size={20} />
                                            <span className="text-gray-700">{mission.manager}</span>
                                        </div>
                                        <div className="flex gap-2 items-center">
                                            <BsCalendar2Event size={20} />
                                            <span className="text-gray-700">{mission.dateRange}</span>
                                        </div>
                                    </div>

                                    {/* Budget */}
                                    <div className="mt-6">
                                        <div className="flex items-center justify-between text-gray-600">
                                            <span className="font-semibold text-gray-900">Budget Used</span>
                                            <span className="text-gray-900">
                                                {mission.budgetUsed / 1000}k / {mission.totalBudget / 1000}k Rwf
                                            </span>
                                        </div>
                                        <div className="mt-2 h-2.5 w-full overflow-hidden rounded-full bg-gray-200">
                                            <div
                                                className="h-full rounded-full bg-blue-500"
                                                style={{ width: `${progressPercentage}%` }}
                                            ></div>
                                        </div>
                                    </div>

                                    {/* View Button */}
                                    <div className="mt-6">
                                        <button
                                            onClick={() => (window.location.href = `/missions/${mission.id}`)} // later with React Router
                                            className="flex w-full items-center justify-center gap-2 rounded-md bg-blue-600 py-2.5 text-center font-semibold text-white transition-colors duration-200 hover:bg-blue-700"
                                        >
                                            <MdOutlineRemoveRedEye size={25} />
                                            View Report
                                        </button>
                                    </div>
                                </li>
                            );
                        })}
                    </ul>


                </div>
            </div>
        </>
    );
};

export default ReportManager;
