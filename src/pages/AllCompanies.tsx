import React, { useState } from "react";
import Header from "../Components/HeaderDash";
import AdminSidebar from "../Components/Admin/AdminSidebar";
import AdminStats from "../Components/Admin/AdminStats";
import CompaniesTable from "../Components/Admin/CompaniesTable";
import { FiSearch } from "react-icons/fi";


const twTheme = (light: string, dark: string) => `${light} dark:${dark}`;

const AllCompanies: React.FC = () => {
  const companies = [
    {
      companyName: "Tech Innovations Ltd",
      email: "info@techinnovations.com",
      status: "Active",
      plan: "Premium",
      contactPerson: "John Doe",
      payment: "Paid",
      lastActivity: "2h ago",
    },
    {
      companyName: "Global Solutions Inc",
      email: "contact@globalsolutions.com",
      status: "Pending",
      plan: "Basic",
      contactPerson: "Jane Smith",
      payment: "Unpaid",
      lastActivity: "1d ago",
    },
    {
      companyName: "Creative Minds LLC",
      email: "hello@creativeminds.com",
      status: "Rejected",
      plan: "Standard",
      contactPerson: "Mike Johnson",
      payment: "Refunded",
      lastActivity: "3d ago",
    },
  ];

  // Search and filter states
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [paymentFilter, setPaymentFilter] = useState("All Payments");

  // Filter companies by search and selected filters
  const filteredCompany = companies.filter((c) => {
    const matchesSearch =
      c.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.contactPerson.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.status.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === "All Status" || c.status === statusFilter;

    const matchesPayment =
      paymentFilter === "All Payments" || c.payment === paymentFilter;

    return matchesSearch && matchesStatus && matchesPayment;
  });

  const statusOptions = ["All Status", "Active", "Pending", "Rejected"];
  const paymentOptions = ["All Payments", "Paid", "Unpaid", "Refunded"];

  return (
    <>
      <Header />
      <div className={`flex gap-70 mt-20 ${twTheme("bg-[#E6EAF5]", "bg-gray-900")}`}>
        <AdminSidebar />

        <main className={`min-h-screen m ${twTheme("", "bg-gray-900")}`}>
          <div className="">
          <AdminStats totalCompanies={0} activeCompanies={0} underReview={0} upcomingPayments={0} blockedCompanies={0} rejectedCompanies={0}  />
          </div>

          <button className="bg-primaryColor-700 w-60 mb-5 text-lg text-center rounded-2xl text-white">
            <div className="flex items-center justify-center">
              <span className="text-4xl mr-2">+</span>
              <span>Add Company</span>
            </div>
          </button>

          <div className="w-[1050px]  bg-white rounded-2xl overflow-x-auto">
            <div className="flex flex-col sm:flex-row gap-2 items-center justify-center p-4">
              {/* Search Input */}
              <div className="flex-1 w-full   sm:w-auto flex gap-2 items-center bg-white rounded-xl border border-gray-300 shadow-sm py-1 mb-2 sm:mb-0 px-2">
                <FiSearch className="text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-8 text-gray-700 placeholder-gray-400 focus:outline-none"
                  placeholder="Search by company, contact, or status"
                />
              </div>

              {/* Status Filter Dropdown */}
              <div className="relative">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-4 py-2 rounded-xl border border-gray-300 shadow-sm bg-white cursor-pointer text-gray-700"
                >
                  {statusOptions.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </div>

              {/* Payment Filter Dropdown */}
              <div className="relative">
                <select
                  value={paymentFilter}
                  onChange={(e) => setPaymentFilter(e.target.value)}
                  className="px-4 py-2 rounded-xl border border-gray-300 shadow-sm bg-white cursor-pointer text-gray-700"
                >
                  {paymentOptions.map((payment) => (
                    <option key={payment} value={payment}>
                      {payment}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Companies Table */}
            <div className="w-[970px] ml-5 flex justify-center">
            <CompaniesTable data={filteredCompany} />
            </div> 
          </div>
        </main>
      </div>
    </>
  );
};

export default AllCompanies;