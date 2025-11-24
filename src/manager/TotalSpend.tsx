// components/TotalSpend.tsx
import React, { useEffect, useState } from "react";
import { CiDollar } from "react-icons/ci";
import axios from "axios";

type TotalSpendProps = {
  subtitle?: string;
  trend?: string;
  another?: string;
  className?: string;
};

const TotalSpend: React.FC<TotalSpendProps> = ({
  subtitle = "Total Spend",
  trend = "+16%",
  another = "vs Last month",
  className = "",
}) => {
  const [amount, setAmount] = useState(0);

  const fetchMissions = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/missions/manager`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      // Sum all missionCost fields
      const total = res.data.data.reduce(
        (acc: number, mission: any) => acc + (mission.missionCost || 0),
        0
      );
      setAmount(total);
    } catch (err) {
      console.error("Error fetching missions:", err);
    }
  };

  useEffect(() => {
    fetchMissions();
    const interval = setInterval(fetchMissions, 10000);
    return () => clearInterval(interval);
  }, []);

  // Format as currency
  const formattedAmount = `$${amount.toLocaleString()}`;

  return (
    <div
      className={`bg-white rounded-xl shadow p-4 flex items-center justify-between ${className}`}
      role="region"
      aria-label="Total spend"
    >
      <div>
        <div className="flex gap-30">
          <p className="text-lg font-bold">{subtitle}</p>
          <div className="text-red-600">
            <CiDollar size={20} aria-hidden />
          </div>
        </div>

        <h2 className="text-2xl font-bold text-red-600 mt-5">{formattedAmount}</h2>
        <p className="text-lg mt-3">
          <span className="text-green-600">{trend}</span> {another}
        </p>
      </div>
    </div>
  );
};

export default TotalSpend;
