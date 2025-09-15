import { Route, Routes} from "react-router-dom";
// import NavBar from "../Components/NavBar";
import LoginForm from "../pages/LoginForm"; // ✅ corrected import
import Dashboard from "../pages/EmployeeDashboard";
import LandingPage from "../pages/LandingPage";
import Profile from "../Components/Settings/Profile";
import Password from "../Components/Settings/Password";
 import Notification from "../Components/Settings/Notification"
import Details from "../Components/Request/Details";

import RecoverPassword from "../forgetPassword/RecoverPassword";

import NotificationPage from "../Components/NotificationPage";
import MissionList from "../Components/MissionList";
import Report from "../Components/Report";
import MissionExpenses from "../expenseLogging/MissionExpenses";
import UpdatePassword from "../forgetPassword/UpdatePassword";
import ManagerDashboard from "../pages/ManagerDashboard";


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
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/details" element={<Profile/>} />
        <Route path="/password" element={<Password/>} />
        <Route path="/notifications" element={<NotificationPage/>} />
        <Route path="/preferences" element={<Notification/>} />
        <Route path="/request" element={<Details/>} />

        <Route path="/forgot-password" element={<RecoverPassword/>}/>
        <Route path="/reset-password/:token" element={<UpdatePassword />} />
        <Route path="/requestList" element={<MissionList/>} />
        <Route path="/report" element={<Report/>} />
        <Route path="/missions/history" element={<MissionExpenses/>}/>
        <Route path="/manager" element={<ManagerDashboard/>}/>
      </Routes>
    </>
  );
};

export default AppRoute;
