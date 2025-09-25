import React, { useState } from "react";
import ReportHeader from "./ReportHeader";
import ActivityLog from "./ActivityLog";
const activityData = [
    { date: "June 15, 2025", time: "08:00", description: "Feedback session" },
    { date: "June 14, 2025", time: "14:00", description: "Follow-up feedback session with stakeholders about project deliverables and risk assessment plan." },
    { date: "June 13, 2025", time: "14:00", description: "Data collection and survey distribution" },
    { date: "June 12, 2025", time: "12:00", description: "Purchased research materials and software licenses to support the project analysis." },
    { date: "June 12, 2025", time: "14:00", description: "Project kickoff meeting with stakeholder" },
];




const twTheme = (light: string, dark: string) => `${light} dark:${dark}`;

const MissionReportDetails: React.FC = () => {
    return (

        <main className={`min-h-screen ${twTheme("", "bg-gray-900")}`}>

            <ReportHeader
                title="Market Research - Q4 Analysis"
                location="New York"
                dateRange="Jan 12, 2025 - Jan 20, 2025"
                status="Ongoing"
                onBack={() => navigate("/reports")}
            />
            <ActivityLog
                activities={activityData}
                onViewMore={() => alert("Load more activities...")}
            />

        </main>
    )
};
export default MissionReportDetails;