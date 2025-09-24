import React from "react";
import { SiTicktick } from "react-icons/si";
import { FaCheck } from "react-icons/fa";
import { MdOutlinePendingActions } from "react-icons/md";
import { RiFileCloseLine } from "react-icons/ri";

interface NotificationCardProps {
  title: string;
  message: string;
  time: string;
  status: "approved" | "completed" | "pending" | "rejected";
  icon: React.ReactNode;
}

const NotificationCard: React.FC<NotificationCardProps> = ({
  title,
  message,
  time,
  status,
  icon,
}) => {
  const getBorderColor = () => {
    switch (status) {
      case "approved":
      case "completed":
        return "border-green-500";
      case "pending":
        return "border-[#FFB361]";
      case "rejected":
        return "border-[#FA7878]";
      default:
        return "border-gray-300";
    }
  };

  return (
    <li
      className={`rounded-lg ${getBorderColor()} border-l-2 bg-white shadow-sm flex gap-5 p-5 items-start w-[900px] mx-auto`}
    >
      <div className="mt-3 bg-gray-100 p-2">{icon}</div>
      <div>
        <h1 className="text-xl font-semibold">{title}</h1>
        <p className="text-sm text-start text-gray-800">{message}</p>
        <p className="text-xs text-gray-500">{time}</p>
      </div>
    </li>
  );
};

const NotificationPage: React.FC = () => {
  return (
    <div className="flex flex-col">
      <div className="py-2 mt-5 bg-gradient-to-l from-accent-10 rounded-md to-primaryColor-50">
        <h1 className="font-bold text-2xl text-center">Notifications</h1>
      </div>

      <ul className="flex flex-col gap-[10px] mt-10 items-center w-full">
        <NotificationCard
          title="Imena Growth Initiative"
          message="Your Mission to London was approved. Congratulations"
          time="Completed 2 months ago"
          status="completed"
          icon={<SiTicktick size={30} className="text-green-500" />}
        />

        <NotificationCard
          title="Agaciro Business Drive"
          message="Mission to Saturn is waiting your approval. Please review the details."
          time="Approved 2 days ago"
          status="approved"
          icon={<FaCheck size={30} className="text-green-500" />}
        />

        <NotificationCard
          title="Umurava Leadership Summit"
          message="Mission to Saturn is waiting your approval. Please review the details."
          time="Pending since 3 days ago"
          status="pending"
          icon={<MdOutlinePendingActions size={30} className="text-[#FFB361]" />}
        />

        <NotificationCard
          title="Gukunda Igihugu Corporate Pathway"
          message="Mission to Venus has been successfully completed. Well done team!"
          time="Mission rejected 1 month ago"
          status="rejected"
          icon={<RiFileCloseLine size={30} className="text-[#FA7878]" />}
        />
      </ul>
    </div>
  );
};

export default NotificationPage;
