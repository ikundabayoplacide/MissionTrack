import { Route, Routes } from "react-router-dom";
// import NavBar from "../Components/NavBar";
import LoginForm from "../pages/LoginForm"; // ✅ corrected import
import Dashboard from "../pages/EmployeeDashboard";
import LandingPage from "../pages/LandingPage";
import Profile from "../Components/Settings/Profile";
import Password from "../Components/Settings/Password";
import Notification from "../Components/Settings/Notification";
import Details from "../Components/Request/Details";

import RecoverPassword from "../Components/forgetPassword/RecoverPassword";

import NotificationPage from "../Components/Dashboard/NotificationPage";
import MissionList from "../Components/Dashboard/MissionList";
import Report from "../Components/Dashboard/Report";
import MissionExpenses from "../Components/expenseLogging/MissionExpenses";
import UpdatePassword from "../Components/forgetPassword/UpdatePassword";
import ManagerDashboard from "../pages/ManagerDashboard";
import ApplicationForm from "../Components/ApplicationForm";
import TeamManagement from "../manager/TeamManagement";
import RequestManager from "../manager/RequestManager";
import ReportManager from "../manager/ReportManager";
import ReportDetails from "../manager/ReportDetails";
import Pending from "../Components/Pending";
import AllCompanies from "../pages/AllCompanies";
import AdminDashboard from "../pages/AdminDashboard";
import Rejected from "../Components/Rejected";
import Subscriptions from "../Components/Subscriptions";
import AllMission from "../pages/AllMission";
import FinanceDashboard from "../pages/FinanceDashboard";
import AdminHome from "../pages/AdminHome";
import ManagerHome from "../pages/ManagerHome";
import EmployeeHome from "../pages/EmployeeHome";
import AdminActions from "../pages/AdminActions";




const AppRoute = () => {
  // const location = useLocation();

  // // Define routes where NavBar should not appear
  // const hideNavbarRoutes = ["/login"];
  // const hideNavbar = hideNavbarRoutes.includes(location.pathname);

  return (
    <>
      {/* {!hideNavbar && <NavBar />} */}

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginForm />} />

        {/* Employee */}
        <Route path="/employee" element={<Dashboard />} >
          <Route index element={<EmployeeHome />} />
          <Route path="notifications" element={<NotificationPage />} />
          <Route path="notifications" element={<NotificationPage />} />
          <Route path="request" element={<Details />} />
          <Route path="requestList" element={<MissionList />} />
          <Route path="expenses" element={<MissionExpenses />} />
          <Route path="report" element={<Report />} />
        </Route>

        <Route path="/profile" element={<Profile />} />
        <Route path="/details" element={<Profile />} />
        <Route path="/password" element={<Password />} />
        <Route path="/preferences" element={<Notification />} />
      

        <Route path="/forgot-password" element={<RecoverPassword />} />
        <Route path="/reset-password/:token" element={<UpdatePassword />} />
        
        


        {/* <Route path="/missions/history" element={<MissionExpenses />} /> */}
        <Route path="/manager" element={<ManagerDashboard />} >
          <Route index element={<ManagerHome />} />
          <Route path="team" element={<TeamManagement />} />
          <Route path="requested" element={<RequestManager />} />
          <Route path="reported" element={<ReportManager />} />
        </Route>
        <Route path="/apply" element={<ApplicationForm />} />
        <Route path="/team" element={<TeamManagement />} />
        {/* <Route path="/requested" element={<RequestManager />} /> */}

        <Route path="/missions/:id" element={<ReportDetails />} />
        <Route path="/pending" element={<Pending />} />



        <Route path="/admin" element={<AdminDashboard />}>
          <Route index element={<AdminHome />} />
          <Route path="home" element={<AdminHome />} />
          <Route path="companies" element={<AllCompanies />} />
          <Route path="subscriptions" element={<Subscriptions />} />
          <Route path="adminactions" element={<AdminActions />} />
        </Route>


        <Route path="/pending" element={<Pending />} />
        <Route path="/rejected" element={<Rejected />} />
        <Route path="/companies" element={<AllCompanies/>} />
        <Route path="/subscriptions" element={<Subscriptions />} />
        <Route path="/all" element={<AllMission/>}/>

        <Route path="/finance" element={<FinanceDashboard />} />


      </Routes>
    </>
  );
};

export default AppRoute;
