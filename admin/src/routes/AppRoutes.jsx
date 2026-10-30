import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import AdminLayout from "../layouts/AdminLayout/AdminLayout";

import Dashboard from "../pages/Dashboard/Dashboard";
import Login from "../pages/Login/Login";
import Projects from "../pages/Projects/Projects";
import Services from "../pages/Services/Services";
import Pricing from "../pages/Pricing/Pricing";
import Testimonials from "../pages/testimonials/Testimonials";
import Inquiries from "../pages/Inquiries/Inquiries";
import Analytics from "../pages/Analytics/Analytics";
import Settings from "../pages/Settings/Settings";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>

        {/* ==========================================
            ADMIN LOGIN
        ========================================== */}
        <Route
          path="/admin/login"
          element={<Login />}
        />

        {/* ==========================================
            ADMIN ROOT
        ========================================== */}
        <Route
          path="/admin"
          element={
            <AdminLayout>
              <Navigate
                to="/admin/dashboard"
                replace
              />
            </AdminLayout>
          }
        />

        {/* ==========================================
            DASHBOARD
        ========================================== */}
        <Route
          path="/admin/dashboard"
          element={
            <AdminLayout>
              <Dashboard />
            </AdminLayout>
          }
        />

        {/* ==========================================
            PROJECTS
        ========================================== */}
        <Route
          path="/admin/projects"
          element={
            <AdminLayout>
              <Projects />
            </AdminLayout>
          }
        />

        {/* ==========================================
            SERVICES
        ========================================== */}
        <Route
          path="/admin/services"
          element={
            <AdminLayout>
              <Services />
            </AdminLayout>
          }
        />

        {/* ==========================================
            PRICING
        ========================================== */}
        <Route
          path="/admin/pricing"
          element={
            <AdminLayout>
              <Pricing />
            </AdminLayout>
          }
        />

        {/* ==========================================
            TESTIMONIALS
        ========================================== */}
        <Route
          path="/admin/testimonials"
          element={
            <AdminLayout>
              <Testimonials />
            </AdminLayout>
          }
        />

        {/* ==========================================
            INQUIRIES
        ========================================== */}
        <Route
          path="/admin/inquiries"
          element={
            <AdminLayout>
              <Inquiries />
            </AdminLayout>
          }
        />

        {/* ==========================================
            ANALYTICS
        ========================================== */}
        <Route
          path="/admin/analytics"
          element={
            <AdminLayout>
              <Analytics />
            </AdminLayout>
          }
        />

        {/* ==========================================
            SETTINGS
        ========================================== */}
        <Route
          path="/admin/settings"
          element={
            <AdminLayout>
              <Settings />
            </AdminLayout>
          }
        />

        {/* ==========================================
            FALLBACK
        ========================================== */}
        <Route
          path="*"
          element={
            <Navigate
              to="/admin/login"
              replace
            />
          }
        />

      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;