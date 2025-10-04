import React from "react";
import { IoDocumentText } from "react-icons/io5";
import { CiWavePulse1 } from "react-icons/ci";
import { SiTicktick } from "react-icons/si";
import { FiDollarSign } from "react-icons/fi";

const Features: React.FC = () => {
    return (
        <div className="flex justify-center">
            <div className=" w-full p-[100px] h-[500px]">
                {/* Header */}
                <div className="flex justify-center">
                    <div className="text-center">
                        <h1 className="text-3xl font-bold">Powerful Features</h1>
                        <p className="text-2xl text-gray-600 mt-5">
                            Everything you need to manage mission requests and expenses in one
                            platform
                        </p>
                    </div>
                </div>

                {/* Cards */}


                <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 ">

                    <div className="p-4 bg-white rounded-lg shadow-sm flex flex-col items-start  w-[280px] mx-auto">
                        <div className="py-15 flex items-start gap-4 flex-col">
                            <div className=" bg-blue-100  rounded-full p-2">

                                <IoDocumentText size={50} className="text-[#4D8FFAE5]" />
                            </div>
                            <div>
                                <h1 className="text-xl font-semibold">Easy Mission Request</h1>
                                <p className="text-sm text-start mt-5 text-gray-800">
                                    Submit mission requests digitally in minutes, eliminating
                                    paperwork and reducing errors.
                                </p>
                            </div>
                        </div>
                    </div>


                    <div className="p-6 rounded-lg  bg-white shadow-sm flex flex-col items-start gap-4 w-[280px] mx-auto">
                        <div className="py-15 flex items-start gap-4 flex-col">
                            <div className=" bg-blue-100  rounded-full p-2">
                                <CiWavePulse1 size={50} className="text-[#4D8FFAE5] " />
                            </div>
                            <div>
                                <h1 className="text-xl font-semibold">Real-time Tracking</h1>
                                <p className="text-sm mt-5 text-start text-gray-800">
                                    Monitor your request status at every stage with instant
                                    notifications and updates.
                                </p>
                            </div>
                        </div>
                    </div>


                    <div className="p-6 rounded-lg bg-white shadow-sm flex flex-col items-start gap-4 w-[280px] mx-auto">
                        <div className="py-15 flex items-start gap-4 flex-col">
                            <div className=" bg-blue-100  rounded-full p-2">
                                < SiTicktick size={50} className="text-[#4D8FFAE5] text-xs" />
                            </div>
                            <div>
                                <h1 className="text-xl font-semibold">Manager Approval</h1>
                                <p className="text-sm mt-5 text-start text-gray-800">
                                    Approvals simplified for managers with clear visibility and fast
                                    decision-making.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Card 4 */}
                    <div className="p-6 bg-white rounded-lg shadow-sm   items-start gap-4 w-[280px] mx-auto">
                        <div className="py-15 flex items-start gap-4 flex-col">
                            <div className=" bg-blue-100 rounded-full ">
                                < FiDollarSign size={50} className="text-[#4D8FFAE5] text-xs" />
                            </div>
                            <div className="">
                                <h1 className="text-xl  font-semibold">Expense Monitoring</h1>
                                <p className="text-sm mt-5 text-start text-gray-600">
                                    Track expenses with ease, ensuring transparency and better
                                    financial control.
                                </p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Features;
