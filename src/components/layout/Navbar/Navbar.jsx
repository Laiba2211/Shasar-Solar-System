import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import "./Navbar.css";

import NavbarBrand from "./NavbarBrand";
import NavbarMenu from "./NavbarMenu";
import NavbarActions from "./NavbarActions";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const navigate = useNavigate();

  const closeMenu = () => {
    setMenuOpen(false);
  };

  // ==========================================
  // Get a Quote → Contact Page
  // ==========================================
  const handleQuote = () => {
    closeMenu();
    navigate("/contact");
  };

  // ==========================================
  // Close Mobile Menu with Escape
  // ==========================================
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        closeMenu();
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  // ==========================================
  // Lock Body Scroll
  // ==========================================
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header>
      {/* ==========================================
          NAVBAR
      ========================================== */}
      <nav className="navbar">
        <div className="container-fluid">

          {/* Logo */}
          <NavbarBrand />

          {/* Desktop Menu */}
          <div className="desktop-menu">
            <NavbarMenu />
          </div>

          {/* Navbar Actions */}
          <NavbarActions
            menuOpen={menuOpen}
            setMenuOpen={setMenuOpen}
            onQuote={handleQuote}
          />

        </div>
      </nav>

      {/* ==========================================
          MOBILE DRAWER
      ========================================== */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Overlay */}
            <motion.div
              className="mobile-overlay"
              onClick={closeMenu}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            />

            {/* Drawer */}
            <motion.aside
              className="mobile-drawer"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{
                duration: 0.35,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {/* Mobile Menu */}
              <NavbarMenu
                mobile
                onNavigate={closeMenu}
              />

              {/* Mobile Get a Quote */}
              <button
                type="button"
                className="mobile-quote-btn"
                onClick={handleQuote}
              >
                Get a Quote
              </button>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;