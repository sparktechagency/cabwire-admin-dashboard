// Routes.jsx
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

// Layout & Pages
import Layout from "./layouts/Layout";
import CheckEmail from "./pages/auth/CheckEmail";
import ForgotPassword from "./pages/auth/ForgotPassword";
import SetPassword from "./pages/auth/SetPassword";
import Login from "./pages/auth/SignIn";
import SuccessReset from "./pages/auth/SucessReset";
import Verify from "./pages/auth/Verify_user";
import Dashboard from "./pages/dashboard/Dashboard";
import NotFound from "./pages/NotFound";
import Notification from "./pages/Notification";
import PrivacyPolicy from "./pages/privacyPolicy";
import TermsConditions from "./pages/TermsConditions";
import UserProfile from "./pages/UserProfile";

// Components for nested routes
import Settings from "./components/Settings/Settings";
import SubscriptionManagement from "./components/SubscriptionManagement/SubscriptionManagement";
import ParkingManagement from "./pages/ParkingManagement/ParkingManagement";
import UserManagement from "./pages/UserManagement/UserManagement";

// DriverManagement & nested RequestTable
import CategoryManagement from "./components/CategoryManagement/CategoryManagement";
import DriverManagement from "./components/DriverManagement/DriverManagement";
import RequestTable from "./components/DriverManagement/RequestTable";
import ProtectedRoute from './components/ProtectedRoute';
import ServicesManagement from "./components/ServicesManagement/ServicesManagement";
import Earning from "./pages/earning/Earning";
import DeletePage from './components/delete-page/DeletePage';

const Routers = () => {
  return (
    <Router>
      <Routes>
        {/* Public/Auth Routes */}
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/success" element={<SuccessReset />} />
        <Route path="/auth/signup/verify" element={<Verify />} />
        <Route path="/auth/login/forgot_password" element={<ForgotPassword />} />
        <Route path="/auth/login/check_email" element={<CheckEmail />} />
        <Route path="/auth/login/set_password" element={<SetPassword />} />
        <Route path="/delete-account" element={<DeletePage />} />

        {/* Protected Routes inside layout */}
        <Route path="/" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
          <Route index element={<Dashboard />} />



          <Route path="user-management" element={<UserManagement />} />

          {/* Driver Management with nested RequestTable */}
          <Route path="/driver-management" element={<DriverManagement />} />
          <Route path="/driver-management/request" element={<RequestTable />} />
          <Route path="category-management" element={<CategoryManagement />} />
          <Route path="service-management" element={<ServicesManagement />} />

          <Route path="parking-management" element={<ParkingManagement />} />

          <Route path="settings" element={<Settings />} />
          <Route path="subscription" element={<SubscriptionManagement />} />
          <Route path="earning" element={<Earning />} />
          <Route path="profile" element={<UserProfile />} />
          <Route path="notification" element={<Notification />} />
          <Route path="privacy-policy" element={<PrivacyPolicy />} />
          <Route path="terms-conditions" element={<TermsConditions />} />
         
        </Route>

        {/* 404 fallback */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default Routers;
