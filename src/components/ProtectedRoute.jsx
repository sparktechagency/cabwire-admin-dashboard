import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../features/auth/authService";

const ProtectedRoute = ({ children }) => {
  // Get the admin login status from localStorage
  const isAdminLogin = localStorage.getItem("adminLoginId");

  // If the user is not authenticated and no valid admin login exists, redirect to login
  if (!isAuthenticated() || !isAdminLogin) {
    return <Navigate to="/auth/login" replace />;
  }

  // Otherwise, render the children (protected content)
  return children;
};

export default ProtectedRoute;
