import React, { useState } from "react";
import { SiTicktick } from "react-icons/si";
import { FaCheck } from "react-icons/fa";
import { MdOutlinePendingActions } from "react-icons/md";
import { RiFileCloseLine } from "react-icons/ri";
import { FiSearch } from "react-icons/fi";
import Header from "../HeaderDash";
import Sidebar from "./Sidebar";

const MissionList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <>
      <Header />
      <div className="flex gap-70 min-h-screen  bg-[#E6EAF5] mt-20">
        <Sidebar />
        <div className="flex flex-col">
          <div className="w-[1200px] py-2 mt-5 bg-gradient-to-l from-accent-10 rounded-md to-primaryColor-50">
            <h1 className="font-bold text-2xl text-center">Your Missions</h1>
          </div>

          {/* Search Box */}
          <div className="relative mb-4 mt-10 flex justify-center">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border border-gray-400 p-2 pl-10 rounded w-1/2 max-sm:w-10/12 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder=""
            />
            {searchTerm === "" && (
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-gray-400 flex items-center pointer-events-none">
                <FiSearch className="mr-2" />
                <span>Search missions...</span>
              </div>
            )}
          </div>

          {/* Missions List */}
          <ul className="flex flex-col gap-[10px] mt-5 items-center w-full">
            {/* Completed Mission */}
            <li className="rounded-lg bg-white shadow-sm flex gap-5 p-5 items-start w-[1200px] mx-auto">
              <div className="mt-3 bg-gray-100 p-2">
                <SiTicktick size={30} className="text-green-500" />
              </div>
              <div>
                <h1 className="text-xl font-semibold">
                  Imena Growth Initiative
                </h1>
                <p className="text-sm text-start text-gray-800">
                  Your Mission to London was approved. Congratulations
                </p>
                <p className="text-xs text-gray-500">Completed 2 months ago</p>
              </div>
            </li>

            {/* Approved Mission */}
            <li className="rounded-lg bg-white shadow-sm flex gap-5 p-5 items-start w-[1200px] mx-auto">
              <div className="mt-3 bg-gray-100 p-2">
                <FaCheck size={30} className="text-green-500" />
              </div>
              <div>
                <h1 className="text-xl font-semibold">Agaciro Business Drive</h1>
                <p className="text-sm text-start text-gray-800">
                  Mission to Saturn is waiting for your approval. Please review
                  the details.
                </p>
                <p className="text-xs text-gray-500">Approved 2 days ago</p>
              </div>
            </li>

            {/* Pending Mission */}
            <li className="rounded-lg bg-white shadow-sm flex gap-5 p-5 items-start w-[1200px] mx-auto">
              <div className="mt-3 bg-gray-100 p-2">
                <MdOutlinePendingActions size={30} className="text-[#FFB361]" />
              </div>
              <div>
                <h1 className="text-xl font-semibold">
                  Umurava Leadership Summit
                </h1>
                <p className="text-sm text-start text-gray-800">
                  Mission to Saturn is waiting for your approval. Please review
                  the details.
                </p>
                <p className="text-xs text-gray-500">Pending since 3 days ago</p>
              </div>
            </li>

            {/* Rejected Mission */}
            <li className="rounded-lg bg-white shadow-sm flex gap-5 p-5 items-start w-[1200px] mx-auto">
              <div className="mt-3 bg-gray-100 p-2">
                <RiFileCloseLine size={30} className="text-[#FA7878]" />
              </div>
              <div>
                <h1 className="text-xl font-semibold">
                  Gukunda Igihugu Corporate Pathway
                </h1>
                <p className="text-sm text-start text-gray-800">
                  Mission to Venus has been successfully completed. Well done
                  team!
                </p>
                <p className="text-xs text-gray-500">Mission rejected 1 month ago</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default MissionList;
