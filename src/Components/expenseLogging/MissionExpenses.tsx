import React, { useState } from "react";
import { FiPlus } from "react-icons/fi";
import Header from "../HeaderDash";
import Sidebar from "../Dashboard/Sidebar";

const MissionExpenses: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"daily" | "calendar">("daily");

  const expenses = [
    {
      date: "24 Sun | 03.2025",
      total: "12,000 Rwf",
      items: [
        { name: "Accommodation", receipt: "Receipt", amount: "8,000 Rwf" },
        { name: "Meal", receipt: "Receipt", amount: "4,000 Rwf" },
      ],
    },
    {
      date: "23 Sat | 03.2025",
      total: "12,000 Rwf",
      items: [
        { name: "Accommodation", receipt: "Receipt", amount: "8,000 Rwf" },
        { name: "Meal", receipt: "Receipt", amount: "4,000 Rwf" },
        { name: "Transport", receipt: "Receipt", amount: "4,000 Rwf" },
      ],
    },
  ];

  return (
    <>
     
        <div className="w-[900px] ml-4 px-10 rounded-lg">
          {/* Header with gradient */}
           <div className="w- py-2 mt-5 bg-gradient-to-l from-accent-10 rounded-md to-primaryColor-50">
            <h1 className="font-bold text-2xl text-center">Mission Expenses</h1>
          </div> 

          <div className="bg-white px-6  mt-5 rounded-lg">
            {/* Tabs */}
            <div className="flex border-b px-4">
              <button
                onClick={() => setActiveTab("daily")}
                className={`px-4 py-2 text-sm font-medium ${
                  activeTab === "daily"
                    ? "border-b-2 border-blue-500 text-blue-600"
                    : "text-gray-500 hover:text-blue-600"
                }`}
              >
                Daily
              </button>
              <button
                onClick={() => setActiveTab("calendar")}
                className={`px-4 py-2 text-sm font-medium ${
                  activeTab === "calendar"
                    ? "border-b-2 border-blue-500 text-black font-bold text-lg"
                    : "text-gray-500 hover:text-blue-600"
                }`}
              >
                Calendar
              </button>
            </div>

            {/* Daily Tab */}
            {activeTab === "daily" && (
              <div className="">
                {expenses.map((exp, index) => (
                  <div
                    key={index}
                    className="border ml-5 mt-20 rounded-md p-3 bg-white"
                  >
                    <div className="flex justify-between items-center border p-2 rounded-lg mb-3">
                      <span className="text-sm font-semibold text-gray-600">
                        {exp.date}
                      </span>
                      <span className="text-sm font-bold text-red-500">
                        {exp.total}
                      </span>
                    </div>

                    <div className="space-y-2">
                      {exp.items.map((item, idx) => (
                        <div
                          key={idx}
                          className="flex justify-between items-center text-sm"
                        >
                          <div className="flex gap-2">
                            <span className="text-gray-700">{item.name}</span>
                            <span className="text-green-600 cursor-pointer underline">
                              {item.receipt}
                            </span>
                          </div>
                          <span className="text-red-500 font-medium">
                            {item.amount}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Calendar Tab */}
            {activeTab === "calendar" && (
              <div className="p-4">
                {/* Days of the week */}
                <div className="grid grid-cols-7 text-center font-semibold">
                  <div>Su</div>
                  <div>Mo</div>
                  <div>Tu</div>
                  <div>We</div>
                  <div>Th</div>
                  <div>Fr</div>
                  <div>Sa</div>
                </div>
                {/* Dates */}
<div className="grid grid-cols-7 text-center mt-2 border">
  {[
    "1","2","3","4","5","6","7",
    "8","9","10","11","12","13",
    "14","15","16","17","18","19","20",
    "21","22","23","24","25","26","27",
    "28","29","30","31","1","2","3","4",
  ].map((day, index) => (
    <div
      key={index}
      className={`border-[0.5px] border-black p-5 ${
        day === "24" ? "bg-blue-500 text-white font-bold" : ""
      }`}
    >
      {day}
    </div>
  ))}
</div>

              </div>
            )}

            {/* Floating Add Button */}
            <div className="flex justify-end p-4">
              <button className="bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition">
                <FiPlus size={20} />
              </button>
            </div>
          </div>
        </div>
      
    </>
  );
};

export default MissionExpenses;
