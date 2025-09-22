import React from 'react';
import { MdOutlinePendingActions, MdOutlineBusiness } from "react-icons/md";

const AdminStats = () => {
    return (
        <div className="flex flex-col  w-[1050px] md:flex-row space-y-4 md:space-y-0 md:space-x-4 p-4">
            {/* Total Registered Companies Card */}
            <div className="p-6 bg-white  w-[230px] rounded-xl shadow-md flex-1">
                <div className="flex justify-between items-center">
                    <p className="text-gray-700 font-medium">
                        Total Registered <span className="block">Companies</span>
                    </p>
                    <div className="bg-blue-100 p-2 rounded-lg">
                        <MdOutlinePendingActions size={24} className="text-blue-600" />
                    </div>
                </div>
                <div className="space-y-1 mt-4">
                    <h3 className="text-4xl font-bold text-blue-600">54</h3>
                    <p className="text-sm text-gray-500">+12% from last month</p>
                </div>
            </div>

            {/* Active Companies Card */}
            <div className="p-6 bg-white w-[220px] rounded-xl shadow-md flex-1">
                <div className="flex justify-between items-center">
                    <p className="text-gray-700 font-medium">
                        Active <span className="block">Companies</span>
                    </p>
                    <div className="bg-green-100 p-2 rounded-lg">
                        <MdOutlineBusiness size={24} className="text-green-600" />
                    </div>
                </div>
                <div className="space-y-1 mt-4">
                    <h3 className="text-4xl font-bold text-green-600">36</h3>
                    <p className="text-sm text-gray-500">+20% from last month</p>
                </div>
            </div>
            {/* Under Review */}
            <div className="p-6 bg-white w-[220px] rounded-xl shadow-md flex-1">
                <div className="flex justify-between items-center">
                    <p className="text-gray-700 font-medium">
                        Companies <span className="block">Under Review</span>
                    </p>
                    <div className="bg-green-100 p-2 rounded-lg">
                        <MdOutlineBusiness size={24} className="text-orange-600" />
                    </div>
                </div>
                <div className="space-y-1 mt-4">
                    <h3 className="text-4xl font-bold text-orange-600">36</h3>
                    <p className="text-sm text-gray-500">+20% from last month</p>
                </div>
            </div>
            {/* Upcoming*/}
            <div className="p-6 bg-white w-[220px] rounded-xl shadow-md flex-1">
                <div className="flex justify-between items-center">
                    <p className="text-gray-700 font-medium">
                        Upcoming <span className="block"> Payments</span>
                    </p>
                    <div className="bg-green-100 p-2 rounded-lg">
                        <MdOutlineBusiness size={24} className="text-orange-600" />
                    </div>
                </div>
                <div className="space-y-1 mt-4">
                    <h3 className="text-4xl font-bold text-orange-600">36</h3>
                    <p className="text-sm text-gray-500">+19 from last month</p>
                </div>
            </div>
                   <div className="p-6 bg-white w-[220px] rounded-xl shadow-md flex-1">
                <div className="flex justify-between items-center">
                    <p className="text-gray-700 font-medium">
                        Upcoming <span className="block"> Payments</span>
                    </p>
                    <div className="bg-green-100 p-2 rounded-lg">
                        <MdOutlineBusiness size={24} className="text-orange-600" />
                    </div>
                </div>
                <div className="space-y-1 mt-4">
                    <h3 className="text-4xl font-bold text-orange-600">36</h3>
                    <p className="text-sm text-gray-500">+19 from last month</p>
                </div>
            </div>
        </div>
    );
};

export default AdminStats;
