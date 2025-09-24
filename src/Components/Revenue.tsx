import React from "react";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { FaCreditCard } from "react-icons/fa";
import { LuTriangleAlert } from "react-icons/lu";

interface DashboardCardProps {
    title: string;
    value: string | number;
    change: string;
    valueColor: string;
    icon: React.ReactNode;
    iconBgColor: string;
    iconColor: string;
}

// A reusable card component for the dashboard
const DashboardCard: React.FC<DashboardCardProps> = ({
    title,
    value,
    change,
    valueColor,
    icon,
    iconBgColor,
    iconColor,
}) => {
    return (
        <div className="flex-1 p-6 bg-white rounded-xl shadow-md flex w-[200px] flex-col space-y-4">
            <div className="flex justify-between items-center">
                <p className="text-gray-700 text-sm font-medium whitespace-nowrap">{title}</p>
                <div className={`p-2 rounded-lg ${iconBgColor}`}>
                    <div className={`${iconColor}`}>{icon}</div>
                </div>
            </div>
            <div className="space-y-1">
                <h3 className={`text-2xl font-bold ${valueColor}`}>{value}</h3>
                <p className="text-sm text-gray-500">{change}</p>
            </div>
        </div>
    );
};

// The main component containing all four cards
const Revenue: React.FC = () => {
    // Icons
    const dollarIcon = <RiMoneyDollarCircleLine size={20} />;

    const cardIcon = <FaCreditCard size={20} />

    const alertIcon = <LuTriangleAlert size={20} />

    return (
        <div className="flex flex-col text-xl md:flex-row space-y-4 md:space-y-0 md:space-x-4 p-4">
            <DashboardCard
                title="Month Revenue"
                value="4,987,543 Rwf"
                change="+9 From Last Month"
                valueColor="text-green-600"
                icon={dollarIcon}
                iconBgColor="bg-green-100"
                iconColor="text-green-600"
            />
            <DashboardCard
                title="Pending Payments"
                value="2,987,234 Rwf"
                change="+9 From Last Month"
                valueColor="text-yellow-600"
                icon={cardIcon}
                iconBgColor="bg-yellow-100"
                iconColor="text-yellow-600"
            />
            <DashboardCard
                title="Overdue Accounts"
                value="3"
                change="+9 From Last Month"
                valueColor="text-orange-600"
                icon={alertIcon}
                iconBgColor="bg-orange-100"
                iconColor="text-orange-600"
            />
            <DashboardCard
                title="Failed Payments"
                value="3"
                change="+9 From Last Month"
                valueColor="text-red-600"
                icon={alertIcon}
                iconBgColor="bg-red-100"
                iconColor="text-red-600"
            />
        </div>
    );
};

export default Revenue;
