// components/TotalSpend.tsx
import React from "react";
import { CiDollar } from "react-icons/ci";
import { FiDollarSign } from "react-icons/fi";

type TotalSpendProps = {
  amount?: string;
  subtitle?: string;
  trend?: string;
  className?: string;
  another?: string;
};

const TotalSpend: React.FC<TotalSpendProps> = ({
  amount = "$48,750",
  subtitle = "Total Spend",
  trend = "+16% ",
  another= "vs Last month",
  className = "",
}) => {
  return (
    <div
      className={`bg-white rounded-xl shadow p-4 flex items-center justify-between ${className}`}
      role="region"
      aria-label="Total spend"
    >
      <div>
        <div className="flex gap-35">
            <p className="text-lg font-bold">{subtitle}</p>
             <div className="text-red-600">
        <CiDollar size={20} aria-hidden />
      </div>
        </div>
        <h2 className="text-2xl font-bold text-red-600 mt-5">{amount}</h2>
        <p className="text-lg mt-3">
  <span className="text-green-600">{trend}</span> {another}
</p>

      </div>

     
    </div>
  );
};

export default TotalSpend;
