// components/TeamMembers.tsx
import React from "react";

const members = [
  { name: "Kaneza Ken", role: "Engineering", forum: "Engineering forum" },
  { name: "Lisa Mwiza", role: "Sales Manager", forum: "Marketing Evolution 2025" },
  { name: "Axel Axel", role: "Engineering", forum: "Engineering forum" },
  { name: "Kaneza Ken", role: "Engineering", forum: "Engineering forum" },
];

const TeamMembers: React.FC = () => {
  return (
    <div className="bg-white rounded-xl shadow p-6 w-[230px]">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Team members</h2>
      <ul className="space-y-4">
        {members.map((member, index) => (
          <li key={index} className="flex items-start gap-3 p-3 rounded-md bg-gray-50 hover:bg-gray-100 transition">
            {/* Avatar Circle */}
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 text-gray-600 font-bold">
              {member.name.charAt(0)}
            </div>

            {/* Member Details */}
            <div className="flex-1">
              <div className="flex items-center gap-7">
                <p className="font-medium text-gray-800">{member.name}</p>
                <span className="text-xs text-white bg-blue-600 px-2 py-0.5 rounded-full">Active</span>
              </div>
              <p className="text-sm text-gray-500">{member.role}</p>
             <div>
                 <p
                
                className="text-sm text-green-600 mt-5"
              >
                {member.forum}
              </p>
             </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TeamMembers;
