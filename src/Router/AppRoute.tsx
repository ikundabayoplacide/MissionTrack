import { Route, Routes} from "react-router-dom";
// import NavBar from "../Components/NavBar";
import LoginForm from "../pages/LoginForm"; // ✅ corrected import
import Dashboard from "../pages/Dashboard";
import LandingPage from "../pages/LandingPage";
import Profile from "../Components/Settings/Profile";
import Password from "../Components/Settings/Password";
 import Notification from "../Components/Settings/Notification"
import Details from "../Components/Request/Details";
import RecoverPassword from "../forgetPassword/RecoverPassword";


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
        <Route path="/notifications" element={<Notification/>} />
        <Route path="/request" element={<Details/>} />
        <Route path="/forgot-password" element={<RecoverPassword/>}/>
      </Routes>
    </>
  );
};

export default AppRoute;
