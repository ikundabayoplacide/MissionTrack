import React from "react";

const CommentsSection: React.FC = () => {
  return (
    <div className=" border border-gray-700 rounded-xl p-2 w-[800px] mx-auto text-white">
      {/* Title */}
      <h2 className="text-lg font-semibold text-gray-600 mb-4">
        Comments / Notes
      </h2>

      {/* Text Area */}
      <div className="mb-4">
        <textarea
          className="w-full h-20 p-4 text-gray-800 bg-white border border-gray-300 rounded-lg shadow-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          placeholder="Enter your comment/notice for this company"
        ></textarea>
      </div>

      {/* Button */}
      <button
        type="button"
        className="px-5 py-1 rounded-lg  border border-gray-600 text-sm font-medium text-gray-400 hover:bg-gray-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 focus:ring-offset-gray-900"
      >
       <span className="text-xl">+ </span>Add Comment
      </button>
    </div>
  );
};

export default CommentsSection;
