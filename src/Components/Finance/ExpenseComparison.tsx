import React from "react";

// Define props for the MonthlyColumn component
interface MonthlyColumnProps {
  monthName: string;
  expenseValue: string;
  changeValue: string;
  changeColor: "green" | "red" | "gray";
}

// A reusable component for each monthly data column
const MonthlyColumn: React.FC<MonthlyColumnProps> = ({
  monthName,
  expenseValue,
  changeValue,
  changeColor,
}) => {
  const getChangeColor = (color: "green" | "red" | "gray") => {
    switch (color) {
      case "green":
        return "text-green-600";
      case "red":
        return "text-red-600";
      case "gray":
      default:
        return "text-gray-600";
    }
  };

  return (
    <div className="flex flex-col items-center flex-1 min-w-0">
      <p className="text-gray-600 mb-2">{monthName}</p>
      <h3 className="text-lg font-bold text-gray-800 mb-1 leading-none">
        {expenseValue}
      </h3>
      <p className={`text-sm ${getChangeColor(changeColor)}`}>{changeValue}</p>
    </div>
  );
};

// Define type for monthly data
interface MonthlyData {
  month: string;
  expense: string;
  change: string;
  color: "green" | "red" | "gray";
}

// The main component containing the monthly expense comparison
const ExpenseComparison: React.FC = () => {
  const monthlyData: MonthlyData[] = [
    { month: "Jan", expense: "RF 902k", change: "0.0%", color: "gray" },
    { month: "Feb", expense: "RF 802k", change: "-4%", color: "red" },
    { month: "March", expense: "RF 902k", change: "+6%", color: "green" },
    { month: "April", expense: "RF 902k", change: "+13%", color: "green" },
    { month: "May", expense: "RF 802k", change: "-7.8%", color: "red" },
    { month: "June", expense: "RF 802k", change: "-4%", color: "red" },
  ];

  return (
    <div className="p-6 bg-white rounded-xl shadow-md w-full max-w-5xl mx-auto">
      <h2 className="text-xl font-semibold text-gray-800 mb-8">
        Monthly Expense Comparison
      </h2>
      <div className="flex justify-between space-x-2">
        {monthlyData.map((data, index) => (
          <MonthlyColumn
            key={index}
            monthName={data.month}
            expenseValue={data.expense}
            changeValue={data.change}
            changeColor={data.color}
          />
        ))}
      </div>
    </div>
  );
};

export default ExpenseComparison;
