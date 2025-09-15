// import React, { useState } from "react";
// import Input from "./Input";
import { SiTicktick } from "react-icons/si";
import Header from "./HeaderDash"
import Sidebar from "./Sidebar";
import { FaCheck } from "react-icons/fa";
import { MdOutlinePendingActions } from "react-icons/md";
import { RiFileCloseLine } from "react-icons/ri";

const NotificationPage: React.FC = () => {




    return (
        <>
            <Header />
            <div className="flex mt-20 min-h-screen bg-primaryColor-10 gap-70">
                <Sidebar />
                <div className="flex flex-col">
                <div className="w-[1200px] py-2 mt-5 bg-gradient-to-l from-accent-10 rounded-md to-primaryColor-50">
                    <h1 className="font-bold text-2xl text-center">
                        Notifications
                    </h1>
                </div>

                <ul className="flex flex-col gap-[10px] mt-10 items-center w-full">

                    <li className="rounded-lg border-l-2 border-green-500 bg-white shadow-sm flex gap-5 p-5 items-start  w-[1200px] mx-auto">

                        <div className="mt-3 bg-gray-100 p-2">
                            <SiTicktick size={30} className="text-green-500" />
                        </div>
                        <div className="">
                            <h1 className="text-xl font-semibold">Imena Growth Initiative</h1>
                            <p className="text-sm  text-start text-gray-800">
                                Your Mission to London was approved.Congratulations
                            </p>
                            <p className="text-xs text-gray-500">completed 2 months ago</p>
                        </div>


                    </li>
                    <li className="rounded-lg border-l-2 border-green-500 bg-white shadow-sm flex gap-5 p-5 items-start  w-[1200px] mx-auto">

                        <div className="mt-3 bg-gray-100 p-2">
                            <FaCheck size={30} className="text-green-500" />
                        </div>
                        <div className="">
                            <h1 className="text-xl font-semibold">Agaciro Business Drive</h1>
                            <p className="text-sm  text-start text-gray-800">
                                Mission to saturn is waiting your approval. Please review the details.
                            </p>
                            <p className="text-xs text-gray-500">Approved  2 day ago</p>
                        </div>


                    </li>
                    <li className="rounded-lg border-l-2 border-[#FFB361] bg-white shadow-sm flex gap-5 p-5 items-start  w-[1200px] mx-auto">

                        <div className="mt-3 bg-gray-100 p-2">
                            <MdOutlinePendingActions size={30} className="text-[#FFB361]" />
                        </div>
                        <div className="">
                            <h1 className="text-xl font-semibold">Umurava Leadership Summit</h1>
                            <p className="text-sm  text-start text-gray-800">
                                Mission to saturn is waiting your approval. Please review the details.
                            </p>
                            <p className="text-xs text-gray-500">Pending since 3 days ago</p>
                        </div>
                        <div />
                    </li>
                    <li className="rounded-lg  bg-white shadow-sm flex gap-5 p-5 items-start  w-[1200px] mx-auto">

                        <div className="mt-3 bg-gray-100 p-2">
                            < RiFileCloseLine size={30} className="text-[#FA7878]" />
                        </div>
                        <div className="">
                            <h1 className="text-xl font-semibold">Gukunda Igihugu Corporate Pathway</h1>
                            <p className="text-sm  text-start text-gray-800">
                                Mission to venus has been  successful completed .Well done team!
                            </p>
                            <p className="text-xs text-gray-500">Mission rejected 1 month ago</p>
                        </div>
                        <div />
                    </li>





                </ul>
                </div>
            </div>
        </>
    );
};

export default NotificationPage;
