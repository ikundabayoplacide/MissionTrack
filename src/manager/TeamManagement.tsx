import React from "react";
import Header from "../Components/HeaderDash";
import ManagerSideBar from "./ManagerSideBar";
import { VscEye } from "react-icons/vsc";

const employees = [
  { initials: "SJ", name: "Sarah Mugeni", role: "Senior Operations Manager", dept: "Operations", status: "On Mission" },
  { initials: "KT", name: "Karenzi Tom", role: "Senior Operations Manager", dept: "Operations", status: "Active" },
  { initials: "LM", name: "Liza Mwiza", role: "Senior Operations Manager", dept: "Operations", status: "Active" },
  { initials: "MW", name: "Mike Who", role: "Senior Operations Manager", dept: "Operations", status: "Active" },
  { initials: "HF", name: "Henry Ford", role: "Senior Operations Manager", dept: "Operations", status: "Active" },
  { initials: "HP", name: "Harry Potter", role: "Senior Operations Manager", dept: "Operations", status: "Active" },
  { initials: "SJ", name: "Sarah Mugeni", role: "Senior Operations Manager", dept: "Operations", status: "On Mission" },
  { initials: "KT", name: "Karenzi Tom", role: "Senior Operations Manager", dept: "Operations", status: "Active" },
  { initials: "LM", name: "Liza Mwiza", role: "Senior Operations Manager", dept: "Operations", status: "Active" },
  { initials: "MW", name: "Mike Who", role: "Senior Operations Manager", dept: "Operations", status: "Active" },
  { initials: "HF", name: "Henry Ford", role: "Senior Operations Manager", dept: "Operations", status: "Active" },
  { initials: "HP", name: "Harry Potter", role: "Senior Operations Manager", dept: "Operations", status: "Active" },
];

const TeamManagement: React.FC = () => {
  return (
    <div className="flex h-screen-full bg-gray-100">
      {/* Sidebar */}
      <ManagerSideBar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <Header />

        <main className="p-6 ml-70 mr-10 mt-20">
          <div className="grid mb-6">
            <h1 className="bg-gradient-to-r from-primaryColor-10 to-accent-10 text-lg text-black font-bold px-4 py-2 rounded-xl shadow">Employee Management</h1>
    
          </div>
           <button className="bg-blue-700 w-60 mb-5 text-lg text-center rounded-2xl text-white">
            <div className="flex ">
                <span className="text-4xl mr-3 ml-10">+</span>
                <span className="mt-2">Add Employee</span>
            </div>
              
            </button>

          {/* Employees Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {employees.map((emp, index) => (
              <div key={index} className="bg-white shadow rounded-xl p-5 flex flex-col items-center">
                {/* Avatar */}
                <div className="w-14 h-14 flex items-center justify-center rounded-full bg-blue-500 text-white font-semibold mb-3">
                  {emp.initials}
                </div>
                <h2 className="text-lg mb-5 font-medium text-gray-800">{emp.name}</h2>
                <p className="text-sm text-gray-500">
                  {emp.role}
                  <br />
                  <span className="ml-13">{emp.dept}</span>
                  
                </p>

                {/* Status */}
                <span
                  className={`mt-8 px-3 py-1 rounded-sm text-xs font-medium ${
                    emp.status === "Active"
                      ? "bg-green-700 text-white"
                      : "bg-blue-700 text-white"
                  }`}
                >
                  {emp.status}
                </span>

                {/* Actions */}
                <div className="flex justify-between items-center w-full mt-4">

              
                    
                <button className="flex  items-center justify-center gap-2 border border-gray-300 w-90 h-10 rounded-md text-sm">
  <VscEye className="text-lg" />
  View
</button>

                  <button className="px-2 py-1 rounded-md border w-12 h-10 border-gray-300">...</button>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default TeamManagement;
