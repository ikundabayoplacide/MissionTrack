import React from "react";

// Props for InfoCard
interface InfoCardProps {
  title: string;
  icon?: React.ReactNode;
  bodyText?: string | null;
  listItems: string[];
  listColor?: "blue" | "green" | "orange" | "gray";
}

// A reusable component for each information card
const InfoCard: React.FC<InfoCardProps> = ({
  title,
  icon,
  bodyText,
  listItems,
  listColor = "gray",
}) => {
  const getCardColorClasses = (color: string) => {
    switch (color) {
      case "blue":
        return "bg-blue-50";
      case "green":
        return "bg-green-50";
      case "orange":
        return "bg-yellow-50";
      default:
        return "bg-gray-50";
    }
  };

  const getTextColor = (color: string) => {
    switch (color) {
      case "blue":
        return "text-blue-700";
      case "green":
        return "text-green-700";
      case "orange":
        return "text-yellow-700";
      default:
        return "text-gray-700";
    }
  };

  const getDotColor = (color: string) => {
    switch (color) {
      case "blue":
        return "bg-blue-700";
      case "green":
        return "bg-green-700";
      case "orange":
        return "bg-yellow-700";
      default:
        return "bg-gray-700";
    }
  };

  return (
    <div
      className={`rounded-xl shadow-lg p-6 w-full max-w-md ${getCardColorClasses(
        listColor
      )}`}
    >
      <div className="flex items-center space-x-2 mb-4">
        {icon && <div>{icon}</div>}
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
      </div>
      {bodyText && <p className="text-sm text-gray-700 mb-4">{bodyText}</p>}
      <ul className="flex flex-col space-y-2">
        {listItems.map((item, index) => (
          <li key={index} className="flex items-start">
            <div
              className={`w-1.5 h-1.5 rounded-full mt-2 mr-2 ${getDotColor(
                listColor
              )}`}
            ></div>
            <span className={`text-sm ${getTextColor(listColor)}`}>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

// The main component containing all three info cards
const AIAnalytics: React.FC = () => {
  const aiIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6 text-blue-600"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M13 10V3L4 14h7v7l9-11h-7z"
      />
    </svg>
  );

  const nextMonthData: InfoCardProps = {
    title: "Next Month Projection",
    icon: null,
    bodyText: "Based on current trends and historical data, we predict:",
    listItems: [
      "Estimated spending: 12,000,000 Rwf",
      "15% increase from current month",
      "Transport costs expected to rise 8%",
    ],
    listColor: "blue",
  };

  const budgetData: InfoCardProps = {
    title: "Budget Recommendations",
    icon: null,
    bodyText: null,
    listItems: [
      "Estimated spending: 12,000,000 Rwf",
      "5% increase from current month",
      "Consider reallocating 5% from HR to Sales",
    ],
    listColor: "green",
  };

  const riskData: InfoCardProps = {
    title: "Risk Alerts",
    icon: null,
    bodyText: null,
    listItems: [
      "Sales dept approaching 85% budget usage",
      "Transport Costs 12% above forecast",
      "Consider budget review in 2 weeks",
    ],
    listColor: "orange",
  };

  return (
    <div className="flex flex-col bg-white space-y-4 rounded-2xl h-[658px] w-[500px] p-4 items-center">
      <InfoCard
        title="AI Predictive Forecast"
        icon={aiIcon}
        bodyText={nextMonthData.bodyText}
        listItems={nextMonthData.listItems}
        listColor={nextMonthData.listColor}
      />
      <InfoCard
        title={budgetData.title}
        icon={budgetData.icon}
        bodyText={budgetData.bodyText}
        listItems={budgetData.listItems}
        listColor={budgetData.listColor}
      />
      <InfoCard
        title={riskData.title}
        icon={riskData.icon}
        bodyText={riskData.bodyText}
        listItems={riskData.listItems}
        listColor={riskData.listColor}
      />
    </div>
  );
};

export default AIAnalytics;
