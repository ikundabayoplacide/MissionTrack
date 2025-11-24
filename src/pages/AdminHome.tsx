import React, { useEffect } from "react";
import TopCard from "../Components/Admin/TopCard";
import RegistrationChart from "../Components/Admin/RegistrationChart";
import ActivityChart from "../Components/Admin/ActivityChart";
import PendingActions from "../Components/Admin/PendingAction";
import RecentActivity from "../Components/RecentActivity";
import Summary from "../Components/Admin/Summary";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../redux/store";
import { getAllCompanies } from "../redux/companyRedux/companySlice";



const twTheme = (light: string, dark: string) => `${light} dark:${dark}`;

const AdminHome: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
      const { companies = [] } = useSelector((state: RootState) => state.company);

      useEffect(() => {
        dispatch(getAllCompanies());
      }, [dispatch]);

      const totalCompanies = companies.length;
      const activeCompanies = companies.filter(c => c.status === "approved" && c.state !== "blocked").length;
      const underReview = companies.filter(c => c.status === "pending").length;
      const upcomingPayments = companies.filter(c => c.state === "trial" && c.status === "approved").length;
      const blockedCompanies = companies.filter(c => c.state === "blocked").length;
      const rejectedCompanies = companies.filter(c => c.status === "rejected").length;


    return(
     <main className={`min-h-screen ${twTheme("", "bg-gray-900")}`}>
    <TopCard
        totalCompanies={totalCompanies}
        activeCompanies={activeCompanies}
        underReview={underReview}
        upcomingPayments={upcomingPayments}
        blockedCompanies={blockedCompanies}
        rejectedCompanies={rejectedCompanies}
    />
    <div className="flex gap-10">
        <div className="grid grid-cols-2 mt-4 gap-10 ">
            <div className="w-[350px]">
                <RegistrationChart />
            </div>
            <div className="w-[350px]">
                <ActivityChart />
            </div>
            <div className="w-[350px]">
                <PendingActions />
            </div>
            <div className="w-[350px] ">
                <RecentActivity />
            </div>


        </div>
        <div className=" ">
            <Summary />
        </div>
    </div>

</main>
)};
export default AdminHome;