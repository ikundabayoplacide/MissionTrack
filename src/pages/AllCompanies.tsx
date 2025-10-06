import React, { useState, useEffect } from "react";
import { useDispatch,useSelector } from "react-redux";
import AdminStats from "../Components/Admin/AdminStats";
import CompaniesTable from "../Components/Admin/CompaniesTable";
import { FiSearch } from "react-icons/fi";
import { getAllCompanies } from "../redux/companyRedux/companySlice";
import type{ RootState,AppDispatch } from "../redux/store";
import { Spin } from "antd";
import ApplicationFormRight from "../Components/ApplicationFormRight";

const twTheme = (light: string, dark: string) => `${light} dark:${dark}`;

const AllCompanies: React.FC = () => {
  const dispatch=useDispatch<AppDispatch>();
  const {companies=[],loading,error}=useSelector((state:RootState)=>state.company);
   const [isModalOpen, setIsModalOpen] = useState(false);

  const totalCompanies = companies.length;
  const activeCompanies = companies.filter(c => c.status === "approved" && c.state!=="blocked").length;
  const underReview = companies.filter(c => c.status === "pending").length;
  const upcomingPayments = companies.filter(c => c.state === "trial" && c.status === "approved").length;
  const blockedCompanies = companies.filter(c => c.state === "blocked").length;
  const rejectedCompanies = companies.filter(c => c.status === "rejected").length;

  // Search and filter states
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [paymentFilter, setPaymentFilter] = useState("All Payments");

  useEffect(()=>{
    dispatch(getAllCompanies());
  },[dispatch]);

  // Filter companies by search and selected filters
const filteredCompany = (companies || []).filter((c) => {
  const matchesSearch =
    c.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.manager?.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.status.toLowerCase().includes(searchQuery.toLowerCase());

  const matchesStatus =
    statusFilter === "All Status" || c.status === statusFilter;

  const matchesPayment =
    paymentFilter === "All Payments" || c.state === paymentFilter;

  return matchesSearch && matchesStatus && matchesPayment;
});

  const statusOptions = ["All Status", "active", "pending", "rejected"];
  const paymentOptions = ["All Payments", "active", "trial", "blocked"];

  return (
    <>
        <main className={`min-h-screen m ${twTheme("", "bg-gray-900")}`}>
          <div className="">
          <AdminStats
            totalCompanies={totalCompanies}
            activeCompanies={activeCompanies}
            underReview={underReview}
            upcomingPayments={upcomingPayments}
            blockedCompanies={blockedCompanies}
            rejectedCompanies={rejectedCompanies}
          />
          </div>

          {/* Add Company Button */}
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-primaryColor-700 w-60 mb-5 text-lg text-center rounded-2xl text-white hover:bg-primaryColor-800 transition"
          >
            <div className="flex items-center justify-center">
              <span className="text-4xl mr-2">+</span>
              <span>Add Company</span>
            </div>
          </button>

          {/* Filters + Table */}
          <div className=" bg-white  lg:w-full px-10 md:px-6 rounded-2xl ">
            <div className="flex flex-col sm:flex-row gap-2 items-center justify-center p-4">
              {/* Search Input */}
              
              <div className="flex-1  flex gap-2 items-center  rounded-xl border border-gray-300 shadow-sm py-1 mb-2 sm:mb-0 px-2">
                <FiSearch className="text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className=" h-8   text-gray-700 placeholder-gray-400 focus:outline-none"
                  placeholder="Search by company, contact, or status"
                />
              </div>

              {/* Status Filter */}
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

              {/* Payment Filter */}
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

            {/* Companies Table */}
            <div className="w-[900px] ml-5 flex justify-center">
              {loading ?(
                <div className="flex justify-center py-4">
            <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-blue-500"></div>
            <p className="ml-2 text-gray-500">Loading companies...</p>
          </div>
              ):(
                error?(
                  <div className="text-red-500">{error}</div>
                ):(
              <CompaniesTable data={filteredCompany} />
                )
              )}
            </div> 
          </div>
        </main>
     

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black opacity-50"
            onClick={() => setIsModalOpen(false)}
          ></div>

          {/* Modal Content */}
          <div className="relative bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 w-[600px] max-h-[90vh] overflow-y-auto">
            {/* Close Button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-3 right-3 text-white hover:text-red-500 text-2xl font-bold"
            >
              ✕
            </button>

            {/* Application Form */}
            <ApplicationFormRight
              onSuccess={() => setIsModalOpen(false)}
              onCancel={() => setIsModalOpen(false)}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default AllCompanies;