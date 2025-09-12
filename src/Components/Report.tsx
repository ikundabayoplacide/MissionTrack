import React from "react";
import Input from "./Input";
import { FiCalendar } from "react-icons/fi";
import Header from "./HeaderDash";
import Sidebar from "./Sidebar";

const Report: React.FC = () => {
    return (
        <>
            <Header />
            <div className="flex gap-70 mt-20">
                <Sidebar />
                <div className="h-[400px] w-[1000px] mt-10 flex bg-white rounded-xl shadow-lg">
                    <div className="flex flex-col  w-full">
                        <div className="border-b border-gray-600 ">
                            {/* Content header */}

                            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                                <h2 className="text-lg font-semibold text-gray-700">
                                    Today's Activities
                                </h2>
                            </div>

                            {/* Date input */}
                            <div className="p-5 w-1/2">
                                <Input
                                    label="Date"
                                    name="date"
                                    type="date"
                                    placeholder=""
                                    icon={<FiCalendar />}
                                />
                            </div>

                            {/* Daily activities */}
                            <div className="px-5 pb-5">
                                <Input
                                    label="Daily Activities"
                                    name="activities"
                                    placeholder="Write your activities here..."
                                    className="h-20"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Report;
