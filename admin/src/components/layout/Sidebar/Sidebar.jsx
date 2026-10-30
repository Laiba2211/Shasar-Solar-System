import {
  LayoutDashboard,
  FolderKanban,
  Wrench,
  BadgeDollarSign,
  MessageSquareText,
  Users,
  BarChart3,
  Settings,
  Sun,
  Moon,
  LogOut,
  X,
} from "lucide-react";

import { Link } from "react-router-dom";

import "./sidebar.css";

const Sidebar = ({
  isOpen,
  onClose,
  theme,
  toggleTheme,
}) => {
  // ==========================================================
  // SIDEBAR MENU
  // ==========================================================

 const menuItems = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    path: "/admin/dashboard",
  },
  {
    label: "Projects",
    icon: FolderKanban,
    path: "/admin/projects",
  },
  {
    label: "Services",
    icon: Wrench,
    path: "/admin/services",
  },
  {
    label: "Pricing",
    icon: BadgeDollarSign,
    path: "/admin/pricing",
  },
  {
    label: "Inquiries",
    icon: MessageSquareText,
    path: "/admin/inquiries",
  },
  {
    label: "Testimonials",
    icon: Users,
    path: "/admin/testimonials",
  },
  {
    label: "Analytics",
    icon: BarChart3,
    path: "/admin/analytics",
  },
];

  // ==========================================================
  // LOGOUT
  // ==========================================================

  const handleLogout = () => {
    // Remove authentication data
    localStorage.removeItem("adminToken");
    localStorage.removeItem("admin");

    sessionStorage.removeItem("adminToken");
    sessionStorage.removeItem("admin");

    // Redirect to login
    window.location.href = "/admin/login";
  };

  return (
    <>
      {/* ======================================================
          MOBILE OVERLAY
      ====================================================== */}

      {isOpen && (
        <div
          className="admin-sidebar-overlay"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* ======================================================
          SIDEBAR
      ====================================================== */}

      <aside
        className={`admin-sidebar ${
          isOpen ? "admin-sidebar--open" : ""
        }`}
      >
        {/* ====================================================
            BRAND
        ==================================================== */}

        <div className="admin-sidebar__brand">
          <div className="admin-sidebar__logo">
            SS
          </div>

          <div className="admin-sidebar__brand-text">
            <strong>Shasar Solar</strong>
            <span>Admin Panel</span>
          </div>

          <button
            type="button"
            className="admin-sidebar__close"
            onClick={onClose}
            aria-label="Close sidebar"
          >
            <X size={20} />
          </button>
        </div>

        {/* ====================================================
            NAVIGATION
        ==================================================== */}

        <nav className="admin-sidebar__nav">
          <div className="admin-sidebar__section-label">
            MAIN MENU
          </div>

          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <Link
                to={item.path}
                className="admin-sidebar__link"
                key={item.label}
                onClick={onClose}
              >
                <Icon
                  size={19}
                  strokeWidth={1.9}
                />

                <span>{item.label}</span>
              </Link>
            );
          })}

          <div className="admin-sidebar__section-label admin-sidebar__section-label--bottom">
            SYSTEM
          </div>

          <Link
            to="/admin/settings"
            className="admin-sidebar__link"
            onClick={onClose}
          >
            <Settings
              size={19}
              strokeWidth={1.9}
            />

            <span>Settings</span>
          </Link>
        </nav>

        {/* ====================================================
            BOTTOM CONTROLS
        ==================================================== */}

        <div className="admin-sidebar__footer">

          {/* Theme */}

          <button
            type="button"
            className="admin-sidebar__theme"
            onClick={toggleTheme}
          >
            {theme === "dark" ? (
              <Sun size={18} />
            ) : (
              <Moon size={18} />
            )}

            <span>
              {theme === "dark"
                ? "Light Mode"
                : "Dark Mode"}
            </span>
          </button>

          {/* Logout */}

          <button
            type="button"
            className="admin-sidebar__logout"
            onClick={handleLogout}
          >
            <LogOut size={18} />

            <span>
              Logout
            </span>
          </button>

        </div>
      </aside>
    </>
  );
};

export default Sidebar;