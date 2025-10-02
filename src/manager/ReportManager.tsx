import React, { useEffect, useState } from "react";
import axios from "axios";
import { BsCalendar2Event } from "react-icons/bs";
import { FiUser } from "react-icons/fi";
import { MdOutlineRemoveRedEye } from "react-icons/md";

interface Report {
  id: string;
  title: string;
  manager: string;
  dateRange: string;
  budgetUsed: number;
  totalBudget: number;
  status: string;
}

const ReportManager: React.FC = () => {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const token = localStorage.getItem("token"); // ✅ stored after login
        const response = await axios.get(
          "https://missiontrack-backend.onrender.com/api/reports/",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
            },
          }
        );

        if (response.data.success) {
          setReports(response.data.data || []);
        }
      } catch (error) {
        console.error("Error fetching reports:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-[#E6EAF5] pr-5">
      <div className="py-2 mt-5 bg-gradient-to-l from-accent-10 rounded-md to-primaryColor-50">
        <h1 className="font-bold text-2xl text-center">Reports</h1>
      </div>

      {/* Summary Cards */}
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-5 gap-2">
        <div className="rounded-lg border border-gray-200 bg-white p-4 shadow">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-500">
              Total missions
            </span>
            <span className="text-sm font-medium text-gray-500">Active</span>
          </div>
          <div className="mt-2 flex items-center justify-between">
            <span className="text-2xl font-bold text-gray-900">
              {reports.length}
            </span>
            <span className="text-2xl font-bold text-orange-500">
              {reports.filter((r) => r.status !== "Completed").length}
            </span>
          </div>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-4 shadow">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-500">
              Total Budget
            </span>
            <span className="text-sm font-medium text-gray-500">Spent</span>
          </div>
          <div className="mt-2 flex items-center justify-between">
            <span className="text-2xl font-bold text-gray-900">
              {reports.reduce((acc, r) => acc + r.totalBudget, 0) / 1000}k
            </span>
            <span className="text-2xl font-bold text-accent-500">
              {reports.reduce((acc, r) => acc + r.budgetUsed, 0) / 1000}k
            </span>
          </div>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-4 shadow">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-500">
              Av.g completion
            </span>
            <span className="text-sm font-medium text-gray-500">Completed</span>
          </div>
          <div className="mt-2 flex items-center justify-between">
            <span className="text-2xl font-bold text-gray-900">
              {reports.length > 0
                ? `${Math.round(
                    (reports.filter((r) => r.status === "Completed").length /
                      reports.length) *
                      100
                  )} %`
                : "0 %"}
            </span>
            <span className="text-2xl font-bold text-primaryColor-600">
              {reports.filter((r) => r.status === "Completed").length}
            </span>
          </div>
        </div>
      </div>

      {/* Reports List */}
      {loading ? (
        <p className="text-center mt-5 text-gray-600">Loading reports...</p>
      ) : reports.length === 0 ? (
        <p className="text-center mt-5 text-gray-600">No reports available</p>
      ) : (
        <ul className="grid bg-accent-10 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[10px] mt-5 items-center w-full">
          {reports.map((report) => {
            const progressPercentage =
              (report.budgetUsed / report.totalBudget) * 100;

            return (
              <li
                key={report.id}
                className="flex w-full max-w-sm flex-col rounded-lg bg-white p-6 shadow-md"
              >
                {/* Header */}
                <div className="flex items-start justify-between">
                  <h2 className="text-xl font-bold text-gray-900">
                    {report.title}
                  </h2>
                  <span
                    className={`rounded-full px-3 py-1 text-sm font-semibold ${
                      report.status === "Completed"
                        ? "bg-accent-600 text-white"
                        : "bg-orange-200 text-orange-800"
                    }`}
                  >
                    {report.status}
                  </span>
                </div>

                {/* Manager & Dates */}
                <div className="mt-4 space-y-2 text-gray-600">
                  <div className="flex gap-2 items-center">
                    <FiUser size={20} />
                    <span className="text-gray-700">{report.manager}</span>
                  </div>
                  <div className="flex gap-2 items-center">
                    <BsCalendar2Event size={20} />
                    <span className="text-gray-700">{report.dateRange}</span>
                  </div>
                </div>

                {/* Budget */}
                <div className="mt-6">
                  <div className="flex items-center justify-between text-gray-600">
                    <span className="font-semibold text-gray-900">
                      Budget Used
                    </span>
                    <span className="text-gray-900">
                      {report.budgetUsed / 1000}k / {report.totalBudget / 1000}k
                      Rwf
                    </span>
                  </div>
                  <div className="mt-2 h-2.5 w-full overflow-hidden rounded-full bg-gray-200">
                    <div
                      className="h-full rounded-full bg-blue-500"
                      style={{ width: `${progressPercentage}%` }}
                    ></div>
                  </div>
                </div>

                {/* View Button */}
                <div className="mt-6">
                  <button className="flex w-full items-center justify-center gap-2 rounded-md bg-blue-600 py-2.5 text-center font-semibold text-white transition-colors duration-200 hover:bg-blue-700">
                    <MdOutlineRemoveRedEye size={25} />
                    View Report
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default ReportManager;
