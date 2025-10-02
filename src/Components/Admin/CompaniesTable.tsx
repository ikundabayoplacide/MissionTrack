import React from "react";
import { FaEdit } from "react-icons/fa";
import { FaEye, FaTrash } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { deleteCompany } from "../../redux/companySlice";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../redux/store";

// Reusable component for the status/plan/payment badges
const Badge: React.FC<{ text: string; type: string }> = ({ text, type }) => {
  const getColorClasses = (badgeType: string) => {
    switch (badgeType) {
      case "approved":
        return "text-blue-600 bg-transparent border border-blue-600";
      case "rejected":
        return "text-red-600 bg-transparent border border-red-600";
      case "pending":
        return "text-yellow-600 bg-transparent border border-yellow-600";
      case "active":
        return "text-green-600 bg-transparent border border-green-600";
      case "trial":
        return "text-yellow-600 bg-transparent border border-yellow-600";
      case "blocked":
        return "text-red-600 bg-transparent border border-red-600";
      default:
        return "text-gray-600 bg-transparent border border-gray-600";
    }
  };

  return (
    <span
      className={`px-3 py-1 rounded-full font-medium text-xs whitespace-nowrap ${getColorClasses(
        type
      )}`}
    >
      {text}
    </span>
  );
};

// ✅ Styled Companies Table
type CompaniesTableProps = {
  data: Array<{
    id: string;
    companyName: string;
    companyEmail: string;
    status: string;
    manager: { fullName: string } | null | undefined;
    state: string;
    createdAt: string | number | Date;
  }>;
};

const CompaniesTable: React.FC<CompaniesTableProps> = ({ data }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-200">
      {/* Table Header */}
      <div className="grid grid-cols-6 gap-6 text-sm font-semibold text-gray-600 bg-gray-100 px-6 py-3">
        <div>Company</div>
        <div>Status</div>
        <div>Manager</div>
        <div>Plan</div>
        <div>Created</div>
        <div className="text-center">Actions</div>
      </div>

      {/* Table Rows */}
      {data.length > 0 ? (
        data.map(
          (
            company: {
              id: string;
              companyName: string;
              companyEmail: string;
              status: string;
              manager: { fullName: string } | null | undefined;
              state: string;
              createdAt: string | number | Date;
            },
            index: number
          ) => (
            <div
              key={index}
              className="grid grid-cols-6 gap-6 items-center text-sm px-6 py-4 border-b border-gray-100 hover:bg-gray-50 transition"
            >
              {/* Company Info */}
              <div className="flex flex-col">
                <span className="font-semibold text-gray-800">
                  {company.companyName}
                </span>
                <span className="text-xs text-gray-500">
                  {company.companyEmail}
                </span>
              </div>

              {/* Status */}
              <div>
                <Badge text={company.status} type={company.status} />
              </div>

              {/* Manager */}
              <div className="text-gray-700">{company.manager?.fullName}</div>

              {/* Plan/State */}
              <div>
                <Badge text={company.state || "N/A"} type={company.state} />
              </div>

              {/* Date */}
              <div className="text-gray-500 text-sm">
                {new Date(company.createdAt).toLocaleDateString()}
              </div>

              {/* Actions */}
              <div className="flex justify-center gap-2">
                <button
                  className="p-2 text-primaryColor-500 rounded-full hover:bg-gray-200 transition"
                  onClick={() => navigate((`/admin/company/${company.id}`))}
                >
                  <FaEye />
                </button>
                <button className="p-2 text-accent-500 rounded-full hover:bg-gray-200 transition">
                  <FaEdit />
                </button>
                <button
                  className="p-2 text-red-500 rounded-full hover:bg-gray-200 transition"
                  onClick={() => {
                    if (window.confirm("Are you sure you want to delete this company?")) {
                      dispatch(deleteCompany(company.id));
                    }
                  }}
                >
                  <FaTrash />
                </button>

              </div>
            </div>
          )
        )
      ) : (
        <div className="text-center text-gray-500 italic py-6">
          No companies found
        </div>
      )}
    </div>
  );
};

export default CompaniesTable;
