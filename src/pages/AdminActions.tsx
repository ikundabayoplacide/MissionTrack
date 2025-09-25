import React, { useState } from "react";
import CompanyHeader from "../Components/Admin/CompanyHeader";
import CompanyInformationCard from "../Components/Admin/CompanyInformationCard";
import ContactPersonCard from "../Components/Admin/ContactPersonCard";
import AdminOperations from "../Components/Admin/AdminOperations";
import CommentsSection from "../Components/Admin/CommentSection";





const twTheme = (light: string, dark: string) => `${light} dark:${dark}`;

const AdminActions: React.FC = () => {
    return (

        <main className={`min-h-screen ${twTheme("", "bg-gray-900")}`}>
            <div className="mt-5 w-[900px]">
            <CompanyHeader companyName="TechStart Inc." status="Pending Review"  />
            </div>

            <div className="bg-white p-6 mt-5 rounded-lg shadow-md mx-5">
            <div className="flex  mt-8">
                <CompanyInformationCard />
                <ContactPersonCard />

            </div>
            <div className="flex justify-center mt-5">
            <AdminOperations />
            </div>
            <div className="mt-10">
                <CommentsSection />
            </div>
            </div>
        </main>
    )
};
export default AdminActions;