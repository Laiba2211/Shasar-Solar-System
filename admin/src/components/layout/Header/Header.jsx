
import { useEffect, useState } from "react";
import {
  Menu,
  Bell,
  Search,
  Sun,
  Moon,
} from "lucide-react";

import "./header.css";

const Header = ({
  onMenuClick,
  theme,
  toggleTheme,
}) => {
  // ==========================================================
  // ADMIN PROFILE
  // ==========================================================

  const [admin, setAdmin] = useState(null);

  useEffect(() => {
    const storedAdmin =
      localStorage.getItem("admin") ||
      sessionStorage.getItem("admin");

    if (storedAdmin) {
      try {
        setAdmin(JSON.parse(storedAdmin));
      } catch (error) {
        console.error(
          "Failed to read admin profile:",
          error
        );
      }
    }
  }, []);

  // ==========================================================
  // ADMIN NAME
  // ==========================================================

  const adminName =
    admin?.name || "Administrator";

  // ==========================================================
  // ADMIN ROLE
  // ==========================================================

  const adminRole =
    admin?.role === "superadmin"
      ? "Super Admin"
      : "Administrator";

  // ==========================================================
  // AVATAR
  // ==========================================================

  const getInitials = (name) => {
    if (!name) return "SS";

    const words = name.trim().split(/\s+/);

    if (words.length === 1) {
      return words[0]
        .substring(0, 2)
        .toUpperCase();
    }

    return (
      words[0][0] +
      words[words.length - 1][0]
    ).toUpperCase();
  };

  return (
    <header className="admin-header">

      {/* ====================================================
          LEFT
      ==================================================== */}

      <div className="admin-header__left">

        <button
          type="button"
          className="admin-header__menu"
          onClick={onMenuClick}
          aria-label="Open sidebar"
        >
          <Menu size={21} />
        </button>

        <div className="admin-header__title">
          <span>Workspace</span>

          <strong>
            Solar Operations
          </strong>
        </div>

      </div>

      {/* ====================================================
          ACTIONS
      ==================================================== */}

      <div className="admin-header__actions">

        {/* Search */}

        <button
          type="button"
          className="admin-header__icon"
          aria-label="Search"
        >
          <Search size={18} />
        </button>

        {/* Notifications */}

        <button
          type="button"
          className="admin-header__icon admin-header__notification"
          aria-label="Notifications"
        >
          <Bell size={18} />

          <span />
        </button>

        {/* Theme */}

        <button
          type="button"
          className="admin-header__icon"
          onClick={toggleTheme}
          aria-label="Toggle theme"
        >
          {theme === "dark" ? (
            <Sun size={18} />
          ) : (
            <Moon size={18} />
          )}
        </button>

        {/* ==================================================
            ADMIN PROFILE
        ================================================== */}

        <div className="admin-header__profile">

          <div className="admin-header__avatar">
            {getInitials(adminName)}
          </div>

          <div className="admin-header__profile-info">

            <strong>
              {adminName}
            </strong>

            <span>
              {adminRole}
            </span>

          </div>

        </div>

      </div>
    </header>
  );
};

export default Header;

