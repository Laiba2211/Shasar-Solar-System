import { useEffect, useState } from "react";

import Sidebar from "../../components/layout/Sidebar/Sidebar";
import Header from "../../components/layout/Header/Header";

import "./adminLayout.css";

const AdminLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("admin-theme") || "light";
  });

  useEffect(() => {
    document.documentElement.setAttribute(
      "data-theme",
      theme
    );

    localStorage.setItem("admin-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((currentTheme) =>
      currentTheme === "dark" ? "light" : "dark"
    );
  };

  return (
    <div className="admin-layout">
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        theme={theme}
        toggleTheme={toggleTheme}
      />

      <div className="admin-layout__main">
        <Header
          onMenuClick={() => setSidebarOpen(true)}
          theme={theme}
          toggleTheme={toggleTheme}
        />

        <main className="admin-layout__content">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;