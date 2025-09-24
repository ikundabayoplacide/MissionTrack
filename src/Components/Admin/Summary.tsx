import React from "react";

// ✅ Define type for summary data item
interface SummaryDataItem {
  label: string;
  value: string;
  color?: "blue" | "red" | "green" | "orange";
}

// ✅ Define props for the reusable SummaryCard component
interface SummaryCardProps {
  title: string;
  data: SummaryDataItem[];
}

// A reusable component for each data summary card
const SummaryCard: React.FC<SummaryCardProps> = ({ title, data }) => {
  // A helper function to get color classes for values
  const getValueColor = (color?: SummaryDataItem["color"]): string => {
    switch (color) {
      case "blue":
        return "text-blue-600";
      case "red":
        return "text-red-600";
      case "green":
        return "text-green-600";
      case "orange":
        return "text-yellow-600";
      default:
        return "text-gray-800";
    }
  };

  return (
    
    <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-sm">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">{title}</h3>
      <div className="flex flex-col space-y-3">
        {data.map((item, index) => (
          <div
            key={index}
            className="flex justify-between items-center text-sm"
          >
            <span className="text-gray-700">{item.label}</span>
            <span className={`font-medium ${getValueColor(item.color)}`}>
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </div>
    
  );
};

// The main component containing all three summary cards
const Summary: React.FC = () => {
  const thisMonthData: SummaryDataItem[] = [
    { label: "New Registrations", value: "67" },
    { label: "Approvals", value: "45" },
    { label: "Rejections", value: "6" },
  ];

  const paymentTrendsData: SummaryDataItem[] = [
    { label: "On Time Payment Rate", value: "87.2%" },
    { label: "Payment Failure Rate", value: "1.2%" },
    { label: "Monthly Churn Rate", value: "6%" },
  ];

  const revenueData: SummaryDataItem[] = [
    { label: "Monthly Revenue", value: "12,324,543 Rwf", color: "blue" },
    { label: "Outstanding", value: "200,000 Rwf", color: "orange" },
    { label: "Growth", value: "+6%", color: "green" },
  ];

  return (
    <div className="flex flex-col space-y-4 p-4 items-center">
      <SummaryCard title="This Month" data={thisMonthData} />
      <SummaryCard title="Payment Trends" data={paymentTrendsData} />
      <SummaryCard title="Revenue" data={revenueData} />
    </div>
  );
};

export default Summary;
