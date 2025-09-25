import React from "react";

const AdminOperations: React.FC = () => {
  return (
    <div className="p-4 bg-white border rounded-lg shadow-sm w-full max-w-md">
      {/* Title */}
      <h3 className="text-sm font-medium text-gray-700 mb-4">
        Admin Operation
      </h3>

      {/* Buttons */}
      <div className="flex space-x-3">
        <button className="px-6 py-2 text-white bg-primaryColor-800 rounded-2xl transition">
          Approve
        </button>
        <button className="px-6 py-2 text-white bg-accent-500 rounded-2xl transition">
          Activate
        </button>
        <button className="px-6 py-2 text-white bg-[#FA7878] rounded-2xl transition">
          Reject
        </button>
      </div>
    </div>
  );
};

export default AdminOperations;
