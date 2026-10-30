
import { Navigate, Outlet } from "react-router-dom";

// ==========================================================
// GET ADMIN AUTHENTICATION
// ==========================================================

const getAdminToken = () => {
  const localToken =
    localStorage.getItem("adminToken");

  const sessionToken =
    sessionStorage.getItem("adminToken");

  return localToken || sessionToken;
};

// ==========================================================
// PROTECTED ROUTE
// ==========================================================

const ProtectedRoute = () => {
  const token = getAdminToken();

  // --------------------------------------------------------
  // NOT AUTHENTICATED
  // --------------------------------------------------------

  if (!token) {
    return (
      <Navigate
        to="/admin/login"
        replace
      />
    );
  }

  // --------------------------------------------------------
  // AUTHENTICATED
  // --------------------------------------------------------

  return <Outlet />;
};

export default ProtectedRoute;

