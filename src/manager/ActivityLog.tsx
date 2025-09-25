import React, { useState } from "react";

// Activity type
type Activity = {
  date: string;
  time: string;
  description: string;
};

interface ActivityLogItemProps extends Activity {}

const ActivityLogItem: React.FC<ActivityLogItemProps> = ({
  date,
  time,
  description,
}) => {
  const [expanded, setExpanded] = useState(false);
  const maxLength = 60; // characters before truncation

  const isLong = description.length > maxLength;
  const displayedText = expanded
    ? description
    : isLong
    ? description.slice(0, maxLength) + "..."
    : description;

  return (
    <li className="flex flex-col sm:flex-row p-4 bg-white rounded-lg border border-gray-200 shadow-sm">
      {/* Date & Time */}
      <div className="flex-none text-sm font-medium text-gray-500 sm:mr-4 whitespace-nowrap mb-2 sm:mb-0">
        <span className="font-semibold text-gray-700">{date}</span>, {time}
      </div>

      {/* Description */}
      <div className="flex-1 text-sm text-gray-800">
        {displayedText}
        {isLong && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="ml-2 text-blue-600 text-xs font-medium hover:underline focus:outline-none"
            aria-label={expanded ? "Show less description" : "Show full description"}
          >
            {expanded ? "Show Less" : "Show More"}
          </button>
        )}
      </div>
    </li>
  );
};

// Main Component Props
interface DailyActivityLogProps {
  title?: string;
  activities: Activity[];
  onViewMore?: () => void;
}

const ActivityLog: React.FC<DailyActivityLogProps> = ({
  title = "Daily Activity Log",
  activities,
  onViewMore,
}) => {
  return (
    <div className="p-6 bg-white rounded-xl shadow-lg w-full max-w-lg mx-auto">
      {/* Header */}
      <div className="flex items-center mb-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          className="h-6 w-6 text-gray-700 mr-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
      </div>

      {/* Activity list */}
      <ul className="flex flex-col space-y-2 mb-4">
        {activities.map((activity, index) => (
          <ActivityLogItem
            key={index}
            date={activity.date}
            time={activity.time}
            description={activity.description}
          />
        ))}
      </ul>

      {/* View More */}
      <div className="flex justify-center">
        <button
          onClick={onViewMore}
          className="text-blue-600 font-medium hover:underline focus:outline-none"
          aria-label="View more activity logs"
        >
          View More
        </button>
      </div>
    </div>
  );
};

export default ActivityLog;
