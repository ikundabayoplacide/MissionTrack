import React, { useState } from "react";
import { SiTicktick } from "react-icons/si";
import { FaCheck } from "react-icons/fa";
import { MdOutlinePendingActions } from "react-icons/md";
import { RiFileCloseLine } from "react-icons/ri";
import { FiSearch } from "react-icons/fi";
import Header from "../Components/HeaderDash";
import ManagerSideBar from "./ManagerSideBar";
import { BsCalendar2Event } from "react-icons/bs";
import { RxCross2 } from "react-icons/rx";

import { PiBagSimple } from "react-icons/pi";
import { IoLocationOutline } from "react-icons/io5";
import { MdOutlineRemoveRedEye } from "react-icons/md";


const RequestManager: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState("");

    return (
        <>
            <Header />
            <div className="flex gap-70 min-h-screen  bg-primaryColor-10 mt-20">
                <ManagerSideBar />
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
                    <ul className=" grid grid-cols-2 gap-[10px] mt-5 items-center w-full">
                        {/* Completed Mission */}
                        <li className="max-w-md mx-auto bg-white rounded-xl w-[500px] shadow-md overflow-hidden md:max-w-2xl m-4 p-6">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <div className="h-12 w-12 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-lg">
                                            SJ
                                        </div>
                                    </div>
                                    <div className="ml-4">
                                        <div className="text-xl font-bold text-gray-900">Sarah Johnson</div>
                                        <p className="text-gray-500">Marketing Manager</p>
                                    </div>
                                </div>
                                <div className="px-3 py-1 text-sm font-semibold text-yellow-600 border border-yellow-600 bg-yellow-100 rounded-full">
                                    Pending
                                </div>
                            </div>

                            <div className="mt-6 space-y-4">
                                <div className="flex items-center">
                                    <PiBagSimple size={25} className="" />
                                    <p className="ml-3 text-gray-700">Mission Title</p>
                                </div>
                                <div className="flex items-center">
                                    <IoLocationOutline size={25} />
                                    <p className="ml-3 text-gray-700">Location</p>
                                </div>
                                <div className="flex items-center">
                                    <BsCalendar2Event size={25} />
                                    <p className="ml-3 text-gray-700">Jan 12, 2025 - Jan 12, 2025</p>
                                </div>
                            </div>

                            <div className="mt-6 flex justify-between space-x-4">
                                <button className="flex-1 gap-2 flex items-center justify-center px-10 py-2 border border-gray-300 rounded-2xl shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50">
                                    <MdOutlineRemoveRedEye size={25} />
                                    Details
                                </button>
                                <div className="grid grid-cols-2 gap-2">
                                    <button className="flex-1 gap-2 flex items-center justify-center px-4 py-2 border border-transparent rounded-2xl shadow-sm text-sm font-medium text-white bg-accent-600">
                                        <FaCheck size={25} />
                                        Approve
                                    </button>
                                    <button className="flex-1 gap-2 flex items-center justify-center px-4 py-2 border border-transparent rounded-2xl shadow-sm text-sm font-medium text-red-600 ">
                                        <RxCross2 size={25} />
                                        Rejected
                                    </button>
                                </div>
                            </div>

                        </li>

                        
                        <li className="max-w-md mx-auto w-[500px] bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl m-4 p-6">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <div className="h-12 w-12 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-lg">
                                            SJ
                                        </div>
                                    </div>
                                    <div className="ml-4">
                                        <div className="text-xl font-bold text-gray-900">Sarah Johnson</div>
                                        <p className="text-gray-500">Marketing Manager</p>
                                    </div>
                                </div>
                                <div className="px-3 py-1 text-sm font-semibold text-red-600 border border-red-600 bg-red-50 rounded-full">
                                    rejected
                                </div>
                            </div>

                            <div className="mt-6 space-y-4">
                                <div className="flex items-center">
                                    <PiBagSimple size={25} className="" />
                                    <p className="ml-3 text-gray-700">Mission Title</p>
                                </div>
                                <div className="flex items-center">
                                    <IoLocationOutline size={25} />
                                    <p className="ml-3 text-gray-700">Location</p>
                                </div>
                                <div className="flex items-center">
                                    <BsCalendar2Event size={25} />
                                    <p className="ml-3 text-gray-700">Jan 12, 2025 - Jan 12, 2025</p>
                                </div>
                            </div>

                            <div className="mt-6 flex justify-between space-x-4">
                                <button className="flex-1 gap-2 flex items-center justify-center px-10 py-2 border border-gray-300 rounded-2xl shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50">
                                    <MdOutlineRemoveRedEye size={25} />
                                    Details
                                </button>
                               
                            </div>

                        </li>
                        
                        <li className="max-w-md mx-auto w-[500px] bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl m-4 p-6">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <div className="h-12 w-12 rounded-full bg-primaryColor-600 text-white flex items-center justify-center font-bold text-lg">
                                            SJ
                                        </div>
                                    </div>
                                    <div className="ml-4">
                                        <div className="text-xl font-bold text-gray-900">Sarah Johnson</div>
                                        <p className="text-gray-500">Marketing Manager</p>
                                    </div>
                                </div>
                                <div className="px-3 py-1 text-sm font-semibold text-white border bg-accent-800 border-accent-400  rounded-full">
                                    approved
                                </div>
                            </div>

                            <div className="mt-6 space-y-4">
                                <div className="flex items-center">
                                    <PiBagSimple size={25} className="" />
                                    <p className="ml-3 text-gray-700">Mission Title</p>
                                </div>
                                <div className="flex items-center">
                                    <IoLocationOutline size={25} />
                                    <p className="ml-3 text-gray-700">Location</p>
                                </div>
                                <div className="flex items-center">
                                    <BsCalendar2Event size={25} />
                                    <p className="ml-3 text-gray-700">Jan 12, 2025 - Jan 12, 2025</p>
                                </div>
                            </div>

                            <div className="mt-6 flex justify-between space-x-4">
                                <button className="flex-1 gap-2 flex items-center justify-center px-10 py-2 border border-gray-300 rounded-2xl shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50">
                                    <MdOutlineRemoveRedEye size={25} />
                                    Details
                                </button>
                               
                            </div>

                        </li>


                        {/* Pending Mission */}
                       
                    </ul>
                </div>
            </div>
        </>
    );
};

export default RequestManager;
