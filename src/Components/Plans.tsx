import React from "react";

// ------------------- Types -------------------
interface PlanCardProps {
  planName: string;
  subscribers: number | string; // can be number or string since your data has both
  price: number | string;
  features: string[];
}

// ------------------- Plan Card -------------------
const PlanCard: React.FC<PlanCardProps> = ({
  planName,
  subscribers,
  price,
  features,
}) => {
  return (
    <div className="flex-1 p-6 w-[250px] rounded-xl border border-gray-200 shadow-sm flex flex-col justify-between">
      
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-gray-800">{planName}</h3>
          <span className="text-sm text-gray-700 bg-gray-100 rounded-full px-3 py-1">
            {subscribers} subscribers
          </span>
        </div>
        <div className="text-4xl font-bold text-gray-800 mb-6">
          ${price}
          <span className="text-xl font-normal text-gray-500">/month</span>
        </div>
        <ul className="space-y-4 mb-8">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-green-500 flex-shrink-0 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span className="text-gray-700">{feature}</span>
            </li>
          ))}
        </ul>
      
      <button className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200">
        Edit Plan
      </button>
    </div>
  );
};

// ------------------- Main Plans Component -------------------
const Plans: React.FC = () => {
  const plans: PlanCardProps[] = [
    {
      planName: "Basic",
      subscribers: 324,
      price: 29,
      features: ["Up to 10 users", "Basic support", "5GB Storage"],
    },
    {
      planName: "Pro",
      subscribers: 521,
      price: 99,
      features: [
        "Up to 50 users",
        "Priority support",
        "50 GB storage",
        "Advanced analytics",
      ],
    },
    {
      planName: "Enterprise",
      subscribers: 141,
      price: 299,
      features: [
        "Unlimited users",
        "24/7 support",
        "Unlimited storage",
        "Custom integrations",
      ],
    },
  ];

  return (
    <div className="p-8 bg-white rounded-2xl">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        Subscription plans
      </h2>
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
        {plans.map((plan, index) => (
          <PlanCard key={index} {...plan} />
        ))}
      </div>
    </div>
  );
};

export default Plans;
