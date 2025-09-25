import React from 'react';
import { MdOutlinePendingActions, MdOutlineBusiness } from "react-icons/md";
interface AdminStatsProps {
  totalCompanies: number;
  activeCompanies: number;
  underReview: number;
  upcomingPayments: number;
  blockedCompanies: number;
   rejectedCompanies: number;
}


const AdminStats: React.FC<AdminStatsProps> = ({
  totalCompanies,
  activeCompanies,
  underReview,
  upcomingPayments,
  blockedCompanies,
    rejectedCompanies,
}) => {
    return (
        <div className="grid     sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-5 md:space-y-0 md:space-x-4 p-4">
            {/* Total Registered Companies Card */}
            <div className="p-6 bg-white  w-[270px] rounded-xl shadow-md flex-1">
                <div className="flex justify-between items-center">
                    <p className="text-gray-700 font-medium">
                        Total Registered <span className="block">Companies</span>
                    </p>
                    <div className="bg-blue-100 p-2 rounded-lg">
                        <MdOutlinePendingActions size={24} className="text-blue-600" />
                    </div>
                </div>
                <div className="space-y-1 mt-4">
                    <h3 className="text-4xl font-bold text-blue-600">
                        {totalCompanies}
                    </h3>
                    <p className="text-sm text-gray-500">+12% from last month</p>
                </div>
            </div>

            {/* Active Companies Card */}
            <div className="p-6 bg-white w-[270px] rounded-xl shadow-md flex-1">
                <div className="flex justify-between items-center">
                    <p className="text-gray-700 font-medium">
                        Active <span className="block">Companies</span>
                    </p>
                    <div className="bg-green-100 p-2 rounded-lg">
                        <MdOutlineBusiness size={24} className="text-green-600" />
                    </div>
                </div>
                <div className="space-y-1 mt-4">
                    <h3 className="text-4xl font-bold text-green-600">{activeCompanies}</h3>
                    <p className="text-sm text-gray-500">+20% from last month</p>
                </div>
            </div>
            {/* Under Review */}
            <div className="p-6 bg-white w-[270px] rounded-xl shadow-md flex-1">
                <div className="flex justify-between items-center">
                    <p className="text-gray-700 font-medium">
                        Companies <span className="block">Under Review</span>
                    </p>
                    <div className="bg-green-100 p-2 rounded-lg">
                        <MdOutlineBusiness size={24} className="text-orange-600" />
                    </div>
                </div>
                <div className="space-y-1 mt-4">
                    <h3 className="text-4xl font-bold text-orange-600">{underReview}</h3>
                    <p className="text-sm text-gray-500">+20% from last month</p>
                </div>
            </div>
            {/* Upcoming*/}
            <div className="p-6 bg-white w-[270px] rounded-xl shadow-md flex-1">
                <div className="flex justify-between items-center">
                    <p className="text-gray-700 font-medium">
                        Upcoming <span className="block"> Payments</span>
                    </p>
                    <div className="bg-green-100 p-2 rounded-lg">
                        <MdOutlineBusiness size={24} className="text-orange-600" />
                    </div>
                </div>
                <div className="space-y-1 mt-4">
                    <h3 className="text-4xl font-bold text-orange-600">{upcomingPayments}</h3>
                    <p className="text-sm text-gray-500">+19 from last month</p>
                </div>
            </div>
                   <div className="p-6 bg-white w-[270px] rounded-xl shadow-md flex-1">
                <div className="flex justify-between items-center">
                    <p className="text-gray-700 font-medium">
                        Blocked <span className="block"> Companies</span>
                    </p>
                    <div className="bg-green-100 p-2 rounded-lg">
                        <MdOutlineBusiness size={24} className="text-orange-600" />
                    </div>
                </div>
                <div className="space-y-1 mt-4">
                    <h3 className="text-4xl font-bold text-orange-600">
                        {blockedCompanies}
                    </h3>
                    <p className="text-sm text-gray-500">+19 from last month</p>
                </div>
            </div>
                          <div className="p-6 bg-white w-[220px] rounded-xl shadow-md flex-1">
                <div className="flex justify-between items-center">
                    <p className="text-gray-700 font-medium">
                        Rejected <span className="block"> Companies</span>
                    </p>
                    <div className="bg-green-100 p-2 rounded-lg">
                        <MdOutlineBusiness size={24} className="text-orange-600" />
                    </div>
                </div>
                <div className="space-y-1 mt-4">
                    <h3 className="text-4xl font-bold text-orange-600">
                        {rejectedCompanies}
                    </h3>
                    <p className="text-sm text-gray-500">+19 from last month</p>
                </div>
            </div>
        </div>
    );
};

export default AdminStats;
