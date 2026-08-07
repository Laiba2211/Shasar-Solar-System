import { Moon, Sun, Menu, X } from "lucide-react";
import useTheme from "../../../hooks/useTheme";

const NavbarActions = ({ menuOpen, setMenuOpen }) => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <div className="navbar-actions">
      {/* Theme Toggle */}
      <button
        className="theme-btn"
        onClick={toggleTheme}
        aria-label="Toggle theme"
      >
        {isDark ? <Sun size={20} /> : <Moon size={20} />}
      </button>

      {/* Desktop Quote Button */}
      <button className="quote-btn">
        Get a Quote
      </button>

      {/* Mobile Hamburger */}
      <button
        className="hamburger-btn"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle Navigation"
        aria-expanded={menuOpen}
      >
        {menuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
    </div>
  );
};

export default NavbarActions;