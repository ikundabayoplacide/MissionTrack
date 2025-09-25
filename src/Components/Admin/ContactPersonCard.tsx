import React from "react";
import { FaPerson, FaPersonRifle, FaRegEnvelope } from "react-icons/fa6";
import { FiPhone, FiUser } from "react-icons/fi";

// Props type for InfoField
interface InfoFieldProps {
  label: string;
  value: string;
  icon?: JSX.Element;
}

// Reusable component for each information field
// This is the same component used for the CompanyInformationCard
const InfoField: React.FC<InfoFieldProps> = ({ label, value, icon }) => {
  return (
    <div className="mb-4">
      <p className="text-sm text-gray-500 font-medium mb-1">{label}</p>
      <div className="flex items-center">
        {icon && <span className="mr-2 text-gray-600">{icon}</span>}
        <span className="text-sm font-semibold text-gray-800">{value}</span>
      </div>
    </div>
  );
};

// Main component for the Contact Person card
const ContactPersonCard: React.FC = () => {
  // SVGs for the icons, reused from the CompanyInformationCard
  const documentIcon: JSX.Element =< FiUser className=""/>

  const emailIcon = <FaRegEnvelope/>
const phoneIcon = <FiPhone/>
  

  return (
    <div className="p-6 bg-white rounded-xl shadow-lg w-full max-w-sm mx-auto">
      {/* Header section */}
      <div className="flex items-center space-x-2 mb-6">
        {documentIcon}
        <h2 className="text-lg font-semibold text-gray-800">Contact Person</h2>
      </div>

      {/* Information fields */}
      <InfoField label="Representative Name" value="David Gasana Niyonkuru" />
      <InfoField label="Email" value="mail@techstart.com" icon={emailIcon} />
      <InfoField label="Phone Number" value="+250 784 543 345" icon={phoneIcon} />
    </div>
  );
};

export default ContactPersonCard;
