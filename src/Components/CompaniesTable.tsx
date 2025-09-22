import React from "react";

// Reusable component for the status/plan/payment badges
const Badge = ({ text, type }) => {
  const getColorClasses = (badgeType) => {
    switch (badgeType) {
      case "Active":
      case "Paid":
        return "bg-green-100 text-green-600";
      case "Pending":
      case "Unpaid":
        return "bg-yellow-100 text-yellow-600";
      case "Rejected":
      case "Refunded":
        return "bg-red-100 text-red-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <div
      className={`px-2 py-1 inline-block rounded-full font-medium text-xs ${getColorClasses(
        type
      )}`}
    >
      {text}
    </div>
  );
};

// ✅ Accept data as props instead of hardcoding
const CompaniesTable = ({ data }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
      {/* Table Header */}
      <div className="grid grid-cols-7 gap-4 text-sm font-semibold text-gray-600 bg-gray-50 p-4">
        <div>Company Name</div>
        <div>Status</div>
        <div>Plan</div>
        <div>Contact Person</div>
        <div>Payment</div>
        <div>Last Activity</div>
        <div>Actions</div>
      </div>

      {/* Table Rows */}
      {data.length > 0 ? (
        data.map((company, index) => (
          <div
            key={index}
            className="grid grid-cols-7 gap-4 items-center text-sm border-b border-gray-200 p-4 last:border-b-0"
          >
            <div>
              <div className="font-semibold text-gray-800">
                {company.companyName}
              </div>
              <div className="text-xs text-gray-500">{company.email}</div>
            </div>
            <div>
              <Badge text={company.status} type={company.status} />
            </div>
            <div>
              <Badge text={company.plan} type="default" />
            </div>
            <div className="text-gray-700">{company.contactPerson}</div>
            <div>
              <Badge text={company.payment} type={company.payment} />
            </div>
            <div className="text-gray-700">{company.lastActivity}</div>
            <div className="flex justify-center">
              <button className="text-gray-400 hover:text-gray-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 12h.01M12 12h.01M19 12h.01"
                  />
                </svg>
              </button>
            </div>
          </div>
        ))
      ) : (
        <div className="text-center text-gray-500 italic py-6">
          No companies found
        </div>
      )}
    </div>
  );
};

export default CompaniesTable;
