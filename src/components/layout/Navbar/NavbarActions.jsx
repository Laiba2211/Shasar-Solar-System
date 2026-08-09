import { Moon, Sun, Menu, X } from "lucide-react";
import useTheme from "../../../hooks/useTheme";

const NavbarActions = ({
  menuOpen,
  setMenuOpen,
  onQuote,
}) => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <div className="navbar-actions">

      {/* ==========================================
          Theme Toggle
      ========================================== */}
      <button
        type="button"
        className="theme-toggle"
        onClick={toggleTheme}
        aria-label={
          isDark
            ? "Switch to light mode"
            : "Switch to dark mode"
        }
        title={
          isDark
            ? "Switch to light mode"
            : "Switch to dark mode"
        }
      >
        {isDark ? (
          <Sun size={20} />
        ) : (
          <Moon size={20} />
        )}
      </button>


      {/* ==========================================
          Desktop Quote Button
      ========================================== */}
      <button
        type="button"
        className="quote-btn"
        onClick={onQuote}
      >
        Get a Quote
      </button>


      {/* ==========================================
          Mobile Hamburger
      ========================================== */}
      <button
        type="button"
        className="hamburger-btn"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label={
          menuOpen
            ? "Close Navigation"
            : "Open Navigation"
        }
        aria-expanded={menuOpen}
      >
        {menuOpen ? (
          <X size={24} />
        ) : (
          <Menu size={24} />
        )}
      </button>

    </div>
  );
};

export default NavbarActions;