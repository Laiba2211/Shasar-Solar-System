import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import "./Navbar.css";

import NavbarBrand from "./NavbarBrand";
import NavbarMenu from "./NavbarMenu";
import NavbarActions from "./NavbarActions";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  // Close with Escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        closeMenu();
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () =>
      document.removeEventListener("keydown", handleEscape);
  }, []);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header className="navbar-wrapper">
      <nav className="navbar custom-navbar">
        <div className="container-fluid navbar-container">
          <NavbarBrand />

          <div className="desktop-menu">
            <NavbarMenu />
          </div>

          <NavbarActions
            menuOpen={menuOpen}
            setMenuOpen={setMenuOpen}
          />
        </div>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              className="mobile-overlay"
              onClick={closeMenu}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            />

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
              <NavbarMenu
                mobile
                onNavigate={closeMenu}
              />

              <button
                className="mobile-quote-btn"
                onClick={closeMenu}
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